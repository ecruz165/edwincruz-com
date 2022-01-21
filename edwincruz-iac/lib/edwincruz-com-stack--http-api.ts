import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigwv2 from '@aws-cdk/aws-apigatewayv2-alpha';
import * as apiintegrations from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import * as s3 from "aws-cdk-lib/aws-s3";

interface HttpApiStackProps extends cdk.StackProps {
  lambdaFunction: lambda.Function,
  websiteBucket: s3.Bucket
}

export class HttpApiStack extends cdk.Stack {

  public readonly httpApi: apigwv2.HttpApi;

  constructor(scope: cdk.App, id: string, props: HttpApiStackProps) {
    super(scope, id, props);

    const {lambdaFunction} = props;
    const defaultLambdaIntegration = new apiintegrations.HttpLambdaIntegration('ECAngularDefaultIntegration', lambdaFunction,);

    const basePath = 'https://edwincruz-com--dev.s3.amazonaws.com/dist/edwincruz-com/browser';
    const webBaseIntegration = new apiintegrations.HttpUrlIntegration('ECWebBaseIntegration', basePath,);
    console.log('URL to Web Base: ' + basePath)

    const assetsPath = 'https://edwincruz-com--dev.s3.amazonaws.com/dist/edwincruz-com/browser/assets';
    const webAssetsIntegration = new apiintegrations.HttpUrlIntegration('ECWebAssetsIntegration', assetsPath);
    console.log('URL to Web Assets: ' + assetsPath)

    this.httpApi = new apigwv2.HttpApi(this, 'edwincruz-app--dev', {
      createDefaultStage: false,
      defaultIntegration: webBaseIntegration
    });
    this.httpApi.addRoutes({
      path: '/assets',
      methods: [apigwv2.HttpMethod.ANY],
      integration: webAssetsIntegration
    });
    this.httpApi.addRoutes({
      path: '/',
      methods: [apigwv2.HttpMethod.ANY],
      integration: defaultLambdaIntegration
    });

    // noticed each route that shares a method required unique integration
    this.addRoute(
      'Blog', apigwv2.HttpMethod.GET,
      'ECAngularIntegration', lambdaFunction);
    this.addRoute(
      'Home', apigwv2.HttpMethod.GET,
      'ECAngularIntegration', lambdaFunction);
    this.addRoute(
      'Resume', apigwv2.HttpMethod.GET,
      'ECAngularIntegration', lambdaFunction);

    const httpsStage = new apigwv2.HttpStage(this, 'Stage', {
      httpApi: this.httpApi,
      stageName: 'dev',
      autoDeploy: true
    });

    new cdk.CfnOutput(this, 'HttpStageURL: ', {value: `${httpsStage.url}`});

  }

  private addRoute(pathName: string, methodTrigger: apigwv2.HttpMethod, integrationName: string, lambdaFunction: lambda.IFunction) {
    const targetIntegration = new apiintegrations.HttpLambdaIntegration(integrationName + pathName, lambdaFunction, {
      parameterMapping: new apigwv2.ParameterMapping()
        .overwritePath(apigwv2.MappingValue.requestPath())
    });
    this.httpApi.addRoutes({
      path: '/' + pathName.toLowerCase(),
      methods: [methodTrigger],
      integration: targetIntegration
    });
  }

}
