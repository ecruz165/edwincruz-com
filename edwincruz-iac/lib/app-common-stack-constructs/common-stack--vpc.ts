import {App, Stack, StackProps} from "aws-cdk-lib";
import {SubnetType, Vpc} from "aws-cdk-lib/aws-ec2";

export class VpcStack extends Stack {

  public readonly vpc: Vpc;

  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    this.vpc = new Vpc(this, `Vpc`, {
      cidr: '10.0.0.0/16',
      natGateways: 1,
      maxAzs: 1,
      subnetConfiguration: [
        {
          name: `Private`,
          subnetType: SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24,
        },
        {
          name: `Public`,
          subnetType: SubnetType.PUBLIC,
          cidrMask: 24,
        }
      ],

    });


  }

}
