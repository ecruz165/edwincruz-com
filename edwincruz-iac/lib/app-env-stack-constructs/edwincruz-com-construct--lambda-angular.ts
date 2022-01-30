import {Duration, Stack} from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import {Construct} from "constructs";

interface LambdaAngularStackProps {
  pathToLambdaCodeAsZipAsset: string
}

export class LambdaAngularConstruct extends Construct {

  public readonly lambdaFunction: lambda.Function;

  constructor(scope: Construct, id: string, props: LambdaAngularStackProps) {
    super(scope, id);

    const {pathToLambdaCodeAsZipAsset} = props;

    this.lambdaFunction = new lambda.Function(this, 'LambdaAngularFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      memorySize: 1024,
      timeout: Duration.seconds(30),
      // handler points to file lambda.js and calls exported handler function
      handler: 'lambda.handler',
      // code requires bucket object and key, where is name of zip file
      // code: lambda.Code.fromBucket(websiteBucket, 'edwincruz-com--dev.zip'),
      code: lambda.Code.fromAsset(pathToLambdaCodeAsZipAsset),
      environment: {
        REGION: Stack.of(this).region,
        AVAILABILITY_ZONES: JSON.stringify(
          Stack.of(this).availabilityZones,
        )
      }
    });

  }
}
