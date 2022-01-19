import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigatewayv2 from '@aws-cdk/aws-apigatewayv2-alpha';
import * as apiintegrations from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import * as s3 from "aws-cdk-lib/aws-s3";

interface HttpApiStackProps extends cdk.StackProps {
  lambdaFunction: lambda.Function,
  webAssetsBucket: s3.Bucket
}

export class HttpApiStack extends cdk.Stack {

  public readonly httpApi: apigatewayv2.HttpApi;

  constructor(scope: cdk.App, id: string, props: HttpApiStackProps) {
    super(scope, id, props);

    this.httpApi = new apigatewayv2.HttpApi(this, "dev-edwincruz-app");

    const {lambdaFunction} = props;
    const lambdaIntegration = new apiintegrations.HttpLambdaIntegration('ECAngularUniversalIntegration', lambdaFunction);
    this.httpApi.addRoutes({
      path: "/",
      methods: [apigatewayv2.HttpMethod.GET],
      integration: lambdaIntegration
    });

    const {webAssetsBucket} = props;
    const webAssetsIntegration = new apiintegrations.HttpUrlIntegration('ECWebAssetsIntegration', webAssetsBucket.bucketWebsiteUrl);
    this.httpApi.addRoutes({
      path: "/assets",
      methods: [apigatewayv2.HttpMethod.GET],
      integration: webAssetsIntegration
    });

    new apigatewayv2.HttpStage(this, 'Stage', {
      httpApi: this.httpApi,
      stageName: 'dev'
    });

  }

}
