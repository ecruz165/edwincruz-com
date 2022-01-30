import {Construct} from "constructs";
import {Environment, Stack, StackProps} from "aws-cdk-lib";
import {ZipWebsiteContentsConstruct} from "./app-env-stack-constructs/edwincruz-com-construct--zip-website-contents";
import {
  WebsiteEnvironmentBucketConstruct
} from "./app-env-stack-constructs/edwincruz-com-construct--website-env-bucket";
import {LambdaAngularConstruct} from "./app-env-stack-constructs/edwincruz-com-construct--lambda-angular";
import {HttpApiConstruct} from "./app-env-stack-constructs/edwincruz-com-construct--gateway-http-api";
import {HostedZone} from "aws-cdk-lib/aws-route53";
import {Certificate} from "aws-cdk-lib/aws-certificatemanager";
import {CdnConstruct} from "./app-env-stack-constructs/edwincruz-com-construct--cdn-distribution";


interface AppEnvStackProps extends StackProps {
  env: Environment,
  projectName: string | undefined,
  projectZoneName: string | undefined,
  projectKey: string | undefined,
  zoneName: string | undefined,
  domain: string | undefined,
  bucketName: string | undefined,
  envName: string | undefined,
  envKey: string | undefined,
  envLabel: string | undefined,
  certificate: Certificate
}

export class AppEnvAngularUniversalStack extends Stack {

  constructor(scope: Construct, id: string, props: AppEnvStackProps) {
    super(scope, id, props);

    const {env} = props;
    const {projectName} = props;
    const {projectZoneName} = props;
    const {projectKey} = props;
    const {zoneName} = props;
    const {domain} = props;
    const {bucketName} = props;
    const {envName} = props;
    const {envKey} = props;
    const {envLabel} = props;
    const {certificate} = props;

    const zipWebsiteContentsConstruct = new ZipWebsiteContentsConstruct(this, `${projectKey}ZipWebsiteContentsConstruct`, {
      env: env,
      projectName: projectName,
      envName: envName,
      envLabel: envLabel
    });


    const websiteBucketConstruct = new WebsiteEnvironmentBucketConstruct(this, `${projectKey}WebsiteBucketConstruct`, {
      projectKey: projectKey,
      bucketName: `${projectName}--${envLabel}`,
      pathToArchive: zipWebsiteContentsConstruct.pathToArchive,
      pathToArchiveDir: zipWebsiteContentsConstruct.pathToArchiveExtracted,
      envLabel: envLabel
    });

    const
      lambdaAngularConstruct = new LambdaAngularConstruct(this, `${projectKey}LambdaAngularConstruct`, {
        pathToLambdaCodeAsZipAsset: `cdk.out/${projectName}--${envLabel}.zip`
      });

    // hosted name worked when a trailing dot was added to domainName
    const hostedZone = HostedZone.fromLookup(
      this, `${projectKey}HostedZone`, {domainName: 'edwincruz.com.'});

    console.log('BEFORE CNAME: ' + hostedZone.zoneName);


    const
      httpApiConstruct = new HttpApiConstruct(this, `${projectKey}HttpApiConstruct`, {
        env: env,
        projectKey: projectKey,
        projectName: projectName,
        projectZoneName: projectZoneName,
        envName: envName,
        envKey: envKey,
        envLabel: envLabel,
        lambdaFunction: lambdaAngularConstruct.lambdaFunction,
        websiteBucket: websiteBucketConstruct.websiteBucket,
        hostedZone: hostedZone,
        certificate: certificate
      });

    const
      cdnStack = new CdnConstruct(this, `${projectKey}CdnConstruct`, {
        websiteBucket: websiteBucketConstruct.websiteBucket,
        env: env,
        envName: envName,
        httpApi: httpApiConstruct.httpApi,
        certificate: certificate,
        hostedZone: hostedZone,
        domain: domain
      });

  }

}
