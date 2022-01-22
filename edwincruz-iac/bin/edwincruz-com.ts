#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {ZipWebsiteContentsStack} from "../lib/edwincruz-com-stack--zip-website-contents";
import {WebsiteBucketStack} from "../lib/edwincruz-com-stack--website-bucket";
import {LambdaAngularStack} from "../lib/edwincruz-com-stack--lambda-angular";
import {HttpApiStack} from "../lib/edwincruz-com-stack--http-api";
import {HostedZoneStack} from "../lib/edwincruz-com-stack--hosted-zone";
import {CertificateStack} from "../lib/edwincruz-com-stack--certificate";
import {CdnStack} from "../lib/edwincruz-com-stack--cdn-distribution";

// https://medium.com/swlh/serverless-angular-universal-with-aws-lambda-99162975eed0
// https://aws.amazon.com/blogs/mt/organize-parameters-by-hierarchy-tags-or-amazon-cloudwatch-events-with-amazon-ec2-systems-manager-parameter-store
// https://dev.to/evnz/single-cloudfront-distribution-for-s3-web-app-and-api-gateway-15c3#step-by-step-tutorial-using-cdk
// https://dev.to/aws-builders/how-to-migrate-cdk-v1-to-cdk-v2-in-10-minuets-6i6
// https://thecodemon.com/referenceerror-primordials-is-not-defined/
// https://levelup.gitconnected.com/use-aws-cdk-to-deploy-a-s3-bucket-static-content-and-create-route53-entries-219038d43eb
const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION
}

const zipWebsiteContentsStack = new ZipWebsiteContentsStack(app, 'ECZipWebsiteContentsStack', {
  env: env
});

const s3BucketStack = new WebsiteBucketStack(app, 'ECWebsiteS3BucketStack', {
  env: env,
  pathToArchive: zipWebsiteContentsStack.pathToArchive,
  pathToArchiveDir: zipWebsiteContentsStack.pathToArchiveExtracted
});

const lambdaAngularStack = new LambdaAngularStack(app, "ECLambdaAngularStack", {
  env: env,
  websiteBucket: s3BucketStack.websiteBucket
});

const httpApiStack = new HttpApiStack(app, "ECHttpApiStack", {
  env: env,
  lambdaFunction: lambdaAngularStack.lambdaFunction,
  websiteBucket: s3BucketStack.websiteBucket
});

//Requires entering Name servers at external Registrar if not registered Amazon i.e. like Godaddy
const hostedZoneStack = new HostedZoneStack(app, 'ECHostedZoneStack', {
  env: env
});

const certificateStack = new CertificateStack(app, 'ECCertificateStack', {
  env: env,
  hostedZone: hostedZoneStack.hostedZone
});

const cdnStackProps = new CdnStack(app, 'ECCdnStackProps', {
  env: env,
  websiteBucket: s3BucketStack.websiteBucket,
  httpApi: httpApiStack.httpApi
})
