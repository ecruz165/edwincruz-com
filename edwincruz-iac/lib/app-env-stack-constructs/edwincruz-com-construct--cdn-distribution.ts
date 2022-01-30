import * as cdk from "aws-cdk-lib";
import {Environment} from "aws-cdk-lib";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import {HttpVersion, ViewerCertificate} from "aws-cdk-lib/aws-cloudfront";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as apigwv2 from '@aws-cdk/aws-apigatewayv2-alpha';
import {Certificate} from "aws-cdk-lib/aws-certificatemanager";
import {ARecord, IHostedZone, RecordTarget} from "aws-cdk-lib/aws-route53";
import {CloudFrontTarget} from "aws-cdk-lib/aws-route53-targets";
import {Construct} from "constructs";

interface CdnStackProps {
  websiteBucket: s3.IBucket,
  env: Environment,
  envName: string | undefined,
  httpApi: apigwv2.HttpApi,
  certificate: Certificate,
  hostedZone: IHostedZone,
  domain: string | undefined,
}

export class CdnConstruct extends Construct {

  public readonly cdn: cloudfront.CloudFrontWebDistribution;

  constructor(scope: Construct, id: string, props: CdnStackProps) {
    super(scope, id);

    const {websiteBucket} = props;
    const {env} = props;
    const {envName} = props;
    const {httpApi} = props;
    const {certificate} = props;
    const {hostedZone} = props;
    const {domain} = props;

    /*
   const cloudfrontOAI = new cloudfront.OriginAccessIdentity(this, 'cloudfront-OAI', {
      comment: `OAI for dev edwincruz-com`
    });

  websiteBucket.addToResourcePolicy(
        new iam.PolicyStatement({
          sid: "Grant Cloudfront Origin Access Identity access to S3 bucket",
          actions: ["s3:GetObject"],
          resources: [websiteBucket.bucketArn + "/*"],
         principals: [cloudfrontOAI.grantPrincipal],
        })
      );
  */

    this.cdn = new cloudfront.CloudFrontWebDistribution(this, "CdnDistribution", {
        viewerCertificate: ViewerCertificate.fromAcmCertificate(certificate, {aliases: [`${domain}`]}),
        comment: "CDN for Angular Universal Web App",
        httpVersion: HttpVersion.HTTP2,
        defaultRootObject: "index.html",
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: websiteBucket,
              originPath: '/dist/edwincruz-com/browser'
              //           originAccessIdentity: cloudfrontOAI,
            },
            behaviors: [
              {
                pathPattern: '/assets/*',
                isDefaultBehavior: false,
                forwardedValues: {
                  queryString: true
                }
              }, {
                pathPattern: '*.*',
                isDefaultBehavior: false,
                forwardedValues: {
                  queryString: true
                }
              }
            ],
          },
          {
            // make sure your backend origin is first in the originConfigs list so it takes precedence over the S3 origin
            customOriginSource: {
              originPath: `/${envName}`,
//              domainName: 'x9it5seva9.execute-api.us-east-1.amazonaws.com',
              domainName: `${httpApi.httpApiId}.execute-api.${env?.region}.amazonaws.com`,
            },
            behaviors: [
              {
                pathPattern: '*',
                isDefaultBehavior: true,
                allowedMethods: cloudfront.CloudFrontAllowedMethods.ALL,
                defaultTtl: cdk.Duration.seconds(0),
                forwardedValues: {
                  queryString: true,
                  //  headers: ["Authorization"], // By default, CloudFront will not forward any headers through so if your API needs authentication make sure you forward auth headers across
                },
              },
            ],
          },

        ]
      }
    );

    const aliasRecord = new ARecord(this, 'AliasRecordForCdn', {
      target: RecordTarget.fromAlias(new CloudFrontTarget(this.cdn)),
      zone: hostedZone,
      recordName: `${domain}`
    });

  }

}
