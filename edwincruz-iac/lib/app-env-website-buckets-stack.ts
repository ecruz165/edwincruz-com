import {Environment, Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {WebsiteBucketConstruct} from "./app-common-stack-constructs/common-stack--website-buckets";


interface AppEnvWebsiteBucketsStackProps extends StackProps {
  env: Environment,
  projectName: string | undefined,
  projectKey: string | undefined,
  envLabel: string | undefined
}

export class AppEnvWebsiteBucketsStack extends Stack {

  constructor(scope: Construct, id: string, props: AppEnvWebsiteBucketsStackProps) {
    super(scope, id, props);

    const {env} = props;
    const {projectName} = props;
    const {projectKey} = props;
    const {envLabel} = props;

    const websiteBucket = new WebsiteBucketConstruct(this, `${projectKey}WebsiteBucketConstruct`, {
        env: env,
        projectKey: projectKey,
        projectName: projectName,
        envLabel: envLabel
      }
    )

  }

}
