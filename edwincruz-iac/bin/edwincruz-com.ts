#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {Environment} from 'aws-cdk-lib';
import {AppCommonHostedZoneStack} from "../lib/app-common-hosted-zone-stack";
import {AppEnvAngularUniversalStack} from "../lib/app-env-angular-universal-stack";
import {AppEnvWebsiteBucketsStack} from "../lib/app-env-website-buckets-stack";
import {AppCommonCertificateStack} from "../lib/app-common-certificate-stack";

interface EnvConfig {
  isProd: boolean;
  envName: string;
  envKey: string;
  accountId: number;
  region: string;
  envLabel: string;
  domain: string;
  alternativeNames: any[];
}

// https://medium.com/swlh/serverless-angular-universal-with-aws-lambda-99162975eed0
// https://aws.amazon.com/blogs/mt/organize-parameters-by-hierarchy-tags-or-amazon-cloudwatch-events-with-amazon-ec2-systems-manager-parameter-store
// https://dev.to/evnz/single-cloudfront-distribution-for-s3-web-app-and-api-gateway-15c3#step-by-step-tutorial-using-cdk
// https://dev.to/aws-builders/how-to-migrate-cdk-v1-to-cdk-v2-in-10-minuets-6i6
// https://thecodemon.com/referenceerror-primordials-is-not-defined/
// https://levelup.gitconnected.com/use-aws-cdk-to-deploy-a-s3-bucket-static-content-and-create-route53-entries-219038d43eb
// https://www.rehanvdm.com/blog/4-methods-to-configure-multiple-environments-in-the-aws-cdk
const app = new cdk.App();

const envConfigAsString = process.env.ENV_CONFIG;

function extractJson(parse: any): EnvConfig | undefined {
  if (envConfigAsString != undefined) {
    return JSON.parse(JSON.parse(envConfigAsString));
  }
  return undefined;
}

const envConfig = extractJson(envConfigAsString);

const env: Environment = {
  account: process.env.ACCOUNT,
  region: process.env.REGION
}

const projectName = process.env.PROJECT_NAME;
const projectKey = process.env.PROJECT_KEY + '';
const zoneName = process.env.PROJECT_ZONE_NAME;


const appCommonHostedZoneStack = new AppCommonHostedZoneStack(app, `${projectKey}CommonHostedZoneStack`, {
  env: env,
  projectName: projectName,
  projectKey: projectKey,
  zoneName: zoneName
});

const appCommonCertificateStack = new AppCommonCertificateStack(app, `${projectKey}CommonCertificateStack`, {
  env: env,
  projectKey: projectKey,
  hostedZone: appCommonHostedZoneStack.hostedZone,
  zoneName: zoneName
});


if (envConfig != undefined) {
  console.log('EnvConfig isProd: ' + envConfig.isProd);
  console.log('EnvConfig envName: ' + envConfig.envName);
  console.log('EnvConfig envKey: ' + envConfig.envKey);
  console.log('EnvConfig accountId: ' + envConfig.accountId);
  console.log('EnvConfig region: ' + envConfig.region);
  console.log('EnvConfig envLabel: ' + envConfig.envLabel);
  console.log('EnvConfig domain: ' + envConfig.domain);

  const appEnvWebsiteBucketsStack = new AppEnvWebsiteBucketsStack(app, `${projectKey}${envConfig.envKey}EnvWebsiteBucketsStack`, {
    env: env,
    projectName: projectName,
    projectKey: projectKey,
    envLabel: envConfig.envLabel
  });
  appEnvWebsiteBucketsStack.addDependency(appCommonHostedZoneStack);

  const appEnvAppStack = new AppEnvAngularUniversalStack(app, `${projectKey}${envConfig.envKey}EnvAppStack`, {
    env: env,
    projectName: projectName,
    projectKey: projectKey,
    zoneName: zoneName,
    domain: envConfig.domain,
    bucketName: projectName,
    envName: envConfig.envName,
    envLabel: envConfig.envLabel,
    certificate: appCommonCertificateStack.certificate
  });
  appEnvAppStack.addDependency(appCommonHostedZoneStack);
  appEnvAppStack.addDependency(appEnvWebsiteBucketsStack);
}
