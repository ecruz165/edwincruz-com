import * as cdk from "aws-cdk-lib";
import * as route53 from 'aws-cdk-lib/aws-route53';

interface HostedZoneStackProps extends cdk.StackProps {
}

export class HostedZoneStack extends cdk.Stack {

  public readonly hostedZone: route53.HostedZone;

  constructor(scope: cdk.App, id: string, props: HostedZoneStackProps) {
    super(scope, id, props);


    this.hostedZone = new route53.PublicHostedZone(this, 'HostedZone', {
      zoneName: 'edwincruz.com',
    });

  }

}
