import * as cdk from "aws-cdk-lib";
import {Environment} from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigwv2 from '@aws-cdk/aws-apigatewayv2-alpha';
import * as apigwv2int from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import * as s3 from "aws-cdk-lib/aws-s3";
import {Construct} from "constructs";
import {CnameRecord, IHostedZone} from "aws-cdk-lib/aws-route53";

import {Certificate, CertificateValidation} from "aws-cdk-lib/aws-certificatemanager";


//https://gregorypierce.medium.com/cdk-restapi-custom-domains-554175a4b1f6
//https://www.readysetcloud.io/blog/allen.helton/adding-a-custom-domain-to-aws-api-gateway/
interface HttpApiConstructProps {
  env: Environment,
  projectKey: string | undefined,
  projectName: string | undefined,
  envLabel: string | undefined,
  lambdaFunction: lambda.Function,
  websiteBucket: s3.IBucket,
  hostedZone: IHostedZone,
  certificate: Certificate
}

export class HttpApiConstruct extends Construct {

  public readonly httpApi: apigwv2.HttpApi;

  constructor(scope: Construct, id: string, props: HttpApiConstructProps) {
    super(scope, id);

    const {env} = props;
    const {projectKey} = props;
    const {projectName} = props;
    const {envLabel} = props;
    const {lambdaFunction} = props;
    const {hostedZone} = props;
    const {certificate} = props;

    const defaultLambdaIntegration = new apigwv2int.HttpLambdaIntegration(`${projectKey}AngularDefaultIntegration`, lambdaFunction,);

    const basePath = `https://${projectName}--${envLabel}.s3.amazonaws.com/dist/${projectName}/browser`;
    const webBaseIntegration = new apigwv2int.HttpUrlIntegration(`${projectKey}WebBaseIntegration`, basePath,);
    console.log('URL to Web Base: ' + basePath)

    const assetsPath = `https://${projectName}--${envLabel}.s3.amazonaws.com/dist/${projectName}/browser/assets`;
    const webAssetsIntegration = new apigwv2int.HttpUrlIntegration(`${projectKey}WebAssetsIntegration`, assetsPath);
    console.log('URL to Web Assets: ' + assetsPath)

    this.httpApi = new apigwv2.HttpApi(this, `${projectKey}HttpApi`, {
      createDefaultStage: false,
      defaultIntegration: webBaseIntegration,
      disableExecuteApiEndpoint: true
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
      `${projectKey}AngularIntegrationBlog`, lambdaFunction);
    this.addRoute(
      'Home', apigwv2.HttpMethod.GET,
      `${projectKey}AngularIntegrationHome`, lambdaFunction);
    this.addRoute(
      'Resume', apigwv2.HttpMethod.GET,
      `${projectKey}AngularIntegrationResume`, lambdaFunction);

  //  console.log('apiEndpoint: ' + this.httpApi.apiEndpoint );
    console.log('httpApiId: ' + this.httpApi.httpApiId );
    console.log('apiId: ' + this.httpApi.apiId );
    const cnameRecord = new CnameRecord(this, `${projectKey}CnameRecord`, {
      recordName: 'www-dev',
      domainName: `${this.httpApi.apiId}.execute-api.${env.region}.amazonaws.com.`,
      zone: hostedZone
    });

    const customDomain = new apigwv2.DomainName(this, 'DomainName', {
      domainName: "www-dev.edwincruz.com",
      certificate: certificate,
      endpointType: apigwv2.EndpointType.REGIONAL,
    });

    this.httpApi.addStage('DevStage',
      {
        stageName: 'dev',
        autoDeploy: true,
        domainMapping: {
          domainName: customDomain,
        }
      }
    );

   // new cdk.CfnOutput(this, 'HttpStageURL: ', {value: `${this.httpApi.url}`});

  }

  private addRoute(pathName: string, methodTrigger: apigwv2.HttpMethod, integrationName: string, lambdaFunction: lambda.IFunction) {
    const targetIntegration = new apigwv2int.HttpLambdaIntegration(integrationName + pathName, lambdaFunction, {
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
