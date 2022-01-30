import {Environment, Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {HostedZoneConstruct} from "./app-common-stack-constructs/common-stack--hosted-zone";
import {HostedZone} from "aws-cdk-lib/aws-route53";


interface AppCommonHostedZoneStackProps extends StackProps {
  env: Environment,
  projectName: string | undefined,
  projectKey: string | undefined,
  zoneName: string | undefined
}

export class AppCommonHostedZoneStack extends Stack {

  public readonly hostedZone: HostedZone;

  constructor(scope: Construct, id: string, props: AppCommonHostedZoneStackProps) {
    super(scope, id, props);

    const {env} = props;
    const {projectName} = props;
    const {projectKey} = props;
    const {zoneName} = props;

    const hostedZoneConstruct = new HostedZoneConstruct(this, `${projectKey}HostedZoneConstruct`, {
        projectKey: projectKey,
        zoneName: zoneName
      }
    )

    this.hostedZone = hostedZoneConstruct.hostedZone;

  }

}
