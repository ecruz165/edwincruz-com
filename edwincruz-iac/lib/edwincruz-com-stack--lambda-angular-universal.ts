import {Duration, Stack, StackProps} from "aws-cdk-lib";
import * as path from 'path';
import {Code, Runtime} from "aws-cdk-lib/aws-lambda";
import {Construct} from "constructs";

interface LambdaAngularUniversalStackProps extends StackProps {
}

export class LambdaAngularUniversalStack extends Stack {

  public readonly lambdaFunction: Function;

  constructor(scope: Construct, id: string, props: LambdaAngularUniversalStackProps) {
    super(scope, id, props);


    // 👇 lambda function definition
    this.lambdaFunction = new Function(this, 'lambda-function', {
      runtime: Runtime.NODEJS_14_X,
      memorySize: 1024,
      timeout: Duration.seconds(30),
      handler: 'lambda.js',
      code: Code.fromAsset(path.join(__dirname, '/')),
      environment: {
        REGION: Stack.of(this).region,
        AVAILABILITY_ZONES: JSON.stringify(
          Stack.of(this).availabilityZones,
        ),
      }
    });


  }
}
