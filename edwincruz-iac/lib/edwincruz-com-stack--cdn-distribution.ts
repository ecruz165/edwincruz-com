import * as cdk from '@aws-cdk/core';
import {Duration} from '@aws-cdk/core';
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as s3 from "@aws-cdk/aws-s3";
import * as iam from "@aws-cdk/aws-iam";
import * as apigateway from "@aws-cdk/aws-apigatewayv2";


interface CdnStackProps extends cdk.StackProps {
  websiteBucket: s3.Bucket,
  httpApi: apigateway.HttpApi
}

export class CdnStack extends cdk.Stack {

  public readonly cdn: cloudfront.CloudFrontWebDistribution;

  constructor(scope: cdk.App, id: string, props: CdnStackProps) {
    super(scope, id, props);

//    const {websiteBucket} = props;
    const {httpApi} = props;

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
      comment: "CDN for Angular Universal Web App",
      defaultRootObject: "index.html",
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
      originConfigs: [
        {
          // make sure your backend origin is first in the originConfigs list so it takes precedence over the S3 origin
          customOriginSource: {
            domainName: `${httpApi.httpApiId}.execute-api.${this.region}.amazonaws.com`,
          },
          behaviors: [
            {
              isDefaultBehavior: true,
              pathPattern: "/api/*", // CloudFront will forward `/api/*` to the backend so make sure all your routes are prepended with `/api/`
              allowedMethods: cloudfront.CloudFrontAllowedMethods.ALL,
              defaultTtl: Duration.seconds(0),
              forwardedValues: {
                queryString: true,
                headers: ["Authorization"], // By default CloudFront will not forward any headers through so if your API needs authentication make sure you forward auth headers across
              },
            },
          ],
        },
      /*  {
          s3OriginSource: {
            s3BucketSource: websiteBucket,
            originAccessIdentity: cloudfrontOAI,
          },
          behaviors: [
            {
              compress: true,
              isDefaultBehavior: true,
              defaultTtl: Duration.seconds(0),
              allowedMethods: cloudfront.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
            },
          ],
        },*/
      ]
    });

  }

}
