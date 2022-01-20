import {Duration, Stack, StackProps} from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import {Construct} from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";

interface LambdaAngularStackProps extends StackProps {
  websiteBucket: s3.Bucket
}

export class LambdaAngularStack extends Stack {

  public readonly lambdaFunction: lambda.Function;

  constructor(scope: Construct, id: string, props: LambdaAngularStackProps) {
    super(scope, id, props);

    const {websiteBucket} = props;
    
    this.lambdaFunction = new lambda.Function(this, 'LambdaAngularFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      memorySize: 1024,
      timeout: Duration.seconds(30),
      // handler points to file lambda.js and calls exported handler function
      handler: 'lambda.handler',
      // code requires bucket object and key, where is name of zip file
      // code: lambda.Code.fromBucket(websiteBucket, 'edwincruz-com--dev.zip'),
      code: lambda.Code.fromAsset('cdk.out/edwincruz-com--dev.zip'),
      environment: {
        REGION: Stack.of(this).region,
        AVAILABILITY_ZONES: JSON.stringify(
          Stack.of(this).availabilityZones,
        )
      }
    });

  }
}
