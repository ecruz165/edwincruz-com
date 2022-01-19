#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {ZipWebsiteContentsStack} from "../lib/edwincruz-com-stack--zip-website-contents";
import {WebsiteBucketStack} from "../lib/edwincruz-com-stack--website-bucket";

// https://medium.com/swlh/serverless-angular-universal-with-aws-lambda-99162975eed0
// https://aws.amazon.com/blogs/mt/organize-parameters-by-hierarchy-tags-or-amazon-cloudwatch-events-with-amazon-ec2-systems-manager-parameter-store
// https://dev.to/evnz/single-cloudfront-distribution-for-s3-web-app-and-api-gateway-15c3#step-by-step-tutorial-using-cdk
// https://dev.to/aws-builders/how-to-migrate-cdk-v1-to-cdk-v2-in-10-minuets-6i6
// https://thecodemon.com/referenceerror-primordials-is-not-defined/
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
  pathToArchiveDir:  zipWebsiteContentsStack.pathToArchiveExtracted
});
