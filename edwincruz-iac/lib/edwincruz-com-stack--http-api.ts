import * as cdk from "aws-cdk-lib";
import {CfnOutput} from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigatewayv2 from '@aws-cdk/aws-apigatewayv2-alpha';
import * as apiintegrations from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import * as s3 from "aws-cdk-lib/aws-s3";
import {MappingValue, ParameterMapping} from "@aws-cdk/aws-apigatewayv2-alpha";

interface HttpApiStackProps extends cdk.StackProps {
  lambdaFunction: lambda.Function,
  websiteBucket: s3.Bucket
}

export class HttpApiStack extends cdk.Stack {

  public readonly httpApi: apigatewayv2.HttpApi;

  constructor(scope: cdk.App, id: string, props: HttpApiStackProps) {
    super(scope, id, props);

    const {lambdaFunction} = props;
    const defaultLambdaIntegration = new apiintegrations.HttpLambdaIntegration('ECAngularDefaultIntegration', lambdaFunction,);
    const lambdaIntegration = new apiintegrations.HttpLambdaIntegration('ECAngularUniversalIntegration', lambdaFunction,{
      parameterMapping: new apigatewayv2.ParameterMapping()
        .overwritePath(MappingValue.requestPath())
    });

    const {websiteBucket} = props;

    console.log('bucketWebsiteUrl: ' + websiteBucket.bucketWebsiteUrl);

    const basePath = 'https://edwincruz-com--dev.s3.amazonaws.com/dist/edwincruz-com/browser';
    const webBaseIntegration = new apiintegrations.HttpUrlIntegration('ECWebBaseIntegration', basePath,);
    console.log('URL to Web Base: ' + basePath)

    const assetsPath = 'https://edwincruz-com--dev.s3.amazonaws.com/dist/edwincruz-com/browser/assets';
    const webAssetsIntegration = new apiintegrations.HttpUrlIntegration('ECWebAssetsIntegration', assetsPath);
    console.log('URL to Web Assets: ' + assetsPath)

    this.httpApi = new apigatewayv2.HttpApi(this, "edwincruz-app--dev", {
      createDefaultStage: false,
      defaultIntegration: webBaseIntegration
    });
    this.httpApi.addRoutes({
      path: "/",
      methods: [apigatewayv2.HttpMethod.ANY],
      integration: defaultLambdaIntegration
    });

    this.httpApi.addRoutes({
      path: "/blog",
      methods: [apigatewayv2.HttpMethod.ANY],
      integration: lambdaIntegration
    });
    this.httpApi.addRoutes({
      path: "/home",
      methods: [apigatewayv2.HttpMethod.ANY],
      integration: lambdaIntegration
    });
    this.httpApi.addRoutes({
      path: "/resume",
      methods: [apigatewayv2.HttpMethod.ANY],
      integration: lambdaIntegration
    });
    /*
    this.httpApi.addRoutes({
      path: "/static",
      methods: [apigatewayv2.HttpMethod.ANY],
      integration: webBaseIntegration
    });*/

    const httpsStage = new apigatewayv2.HttpStage(this, 'Stage', {
      httpApi: this.httpApi,
      stageName: 'dev',
      autoDeploy: true
    });

    new CfnOutput(this, 'HttpStageURL: ', {value: `${httpsStage.url}/`});

  }

}
