import * as route53 from 'aws-cdk-lib/aws-route53';
import {Construct} from "constructs";

interface HostedZoneStackProps {
  projectKey: string | undefined,
  zoneName: string | undefined
}

export class HostedZoneConstruct extends Construct {

  public readonly hostedZone: route53.HostedZone;

  constructor(scope: Construct, id: string, props: HostedZoneStackProps) {
    super(scope, id);

    const {projectKey} = props;
    const zoneName = props?.zoneName + ''

    this.hostedZone = new route53.PublicHostedZone(this, `${projectKey}HostedZone`, {
      zoneName: zoneName
    });

  }

}
