import {Environment} from "aws-cdk-lib";
import {Construct} from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigwv2 from '@aws-cdk/aws-apigatewayv2-alpha';
import * as apigwv2int from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import * as s3 from "aws-cdk-lib/aws-s3";
import *  as route53 from "aws-cdk-lib/aws-route53";
import {Certificate} from "aws-cdk-lib/aws-certificatemanager";
import {ApiGatewayv2DomainProperties} from "aws-cdk-lib/aws-route53-targets";


//https://gregorypierce.medium.com/cdk-restapi-custom-domains-554175a4b1f6
//https://www.readysetcloud.io/blog/allen.helton/adding-a-custom-domain-to-aws-api-gateway/
interface HttpApiConstructProps {
  env: Environment,
  projectKey: string | undefined,
  projectName: string | undefined,
  projectZoneName: string | undefined,
  envName: string | undefined,
  envKey: string | undefined,
  envLabel: string | undefined,
  lambdaFunction: lambda.Function,
  websiteBucket: s3.IBucket,
  hostedZone: route53.IHostedZone,
  certificate: Certificate
}

export class HttpApiConstruct extends Construct {

  public readonly httpApi: apigwv2.HttpApi;

  constructor(scope: Construct, id: string, props: HttpApiConstructProps) {
    super(scope, id);

    const {env} = props;
    const {projectKey} = props;
    const {projectName} = props;
    const {projectZoneName} = props;
    const {envName} = props;
    const {envKey} = props;
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


    const docsPath = `https://${projectName}--${envLabel}.s3.amazonaws.com/dist/${projectName}/browser/docs`;
    const webDocsIntegration = new apigwv2int.HttpUrlIntegration(`${projectKey}WebDocsIntegration`, docsPath);
    console.log('URL to Web Docs: ' + docsPath)


    this.httpApi = new apigwv2.HttpApi(this, `${projectKey}HttpApi`, {
      createDefaultStage: false,
      defaultIntegration: webBaseIntegration,
      disableExecuteApiEndpoint: false
    });
    this.httpApi.addRoutes({
      path: '/assets',
      methods: [apigwv2.HttpMethod.ANY],
      integration: webAssetsIntegration
    });
    this.httpApi.addRoutes({
      path: '/docs',
      methods: [apigwv2.HttpMethod.ANY],
      integration: webDocsIntegration
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

    this.addRoute(
      'Presentations', apigwv2.HttpMethod.GET,
      `${projectKey}AngularIntegrationPresentations`, lambdaFunction);

    const customDomain = new apigwv2.DomainName(this, 'DomainName', {
      domainName: `${envLabel}.${projectZoneName}`,
      certificate: certificate,
      endpointType: apigwv2.EndpointType.REGIONAL,
    });

    this.httpApi.addStage(`${projectKey}${envKey}Stage`,
      {
        stageName: `${envName}`,
        autoDeploy: true,
        domainMapping: {
          domainName: customDomain,
        }
      }
    );

    const aRecord = new route53.ARecord(this, `${projectKey}ARecord`, {
      zone: hostedZone,
      recordName: `${envLabel}`,
      target: route53.RecordTarget
        .fromAlias(new ApiGatewayv2DomainProperties(customDomain.regionalDomainName, customDomain.regionalHostedZoneId))

    })

    /*
      Custom domain needed a ARecord
      const cnameRecord = new CnameRecord(this, `${projectKey}CnameRecord`, {
        recordName: `${envLabel}`,
        domainName: `${this.httpApi.apiId}.execute-api.${env.region}.amazonaws.com.`,
        zone: hostedZone
      });*/

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
