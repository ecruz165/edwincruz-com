import * as cdk from "aws-cdk-lib";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import {HttpVersion, ViewerCertificate} from "aws-cdk-lib/aws-cloudfront";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as apigwv2 from '@aws-cdk/aws-apigatewayv2-alpha';
import {Certificate} from "aws-cdk-lib/aws-certificatemanager";
import {ARecord, HostedZone, RecordTarget} from "aws-cdk-lib/aws-route53";
import {CloudFrontTarget} from "aws-cdk-lib/aws-route53-targets";

interface CdnStackProps extends cdk.StackProps {
  websiteBucket: s3.Bucket,
  httpApi: apigwv2.HttpApi;
  certificate: Certificate;
  hostedZone: HostedZone;
}

export class CdnStack extends cdk.Stack {

  public readonly cdn: cloudfront.CloudFrontWebDistribution;

  constructor(scope: cdk.App, id: string, props: CdnStackProps) {
    super(scope, id, props);

    const {websiteBucket} = props;
    const {httpApi} = props;
    const {env} = props;
    const {certificate} = props;
    const {hostedZone} = props;

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
        viewerCertificate: ViewerCertificate.fromAcmCertificate(certificate, {aliases: ['dev.edwincruz.com']}),
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
              }
            ],
          },
          {
            // make sure your backend origin is first in the originConfigs list so it takes precedence over the S3 origin
            customOriginSource: {
              originPath: '/dev',
              domainName: 'x9it5seva9.execute-api.us-east-1.amazonaws.com',
//            domainName: `${httpApi.httpApiId}.execute-api.${env?.region}.amazonaws.com`,
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
      recordName: 'dev.edwincruz.com'
    });

  }

}
