import {Environment, Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {HostedZone} from "aws-cdk-lib/aws-route53";
import {Certificate, CertificateValidation} from "aws-cdk-lib/aws-certificatemanager";


interface AppCommonCertificateStackProps extends StackProps {
  env: Environment,
  projectKey: string | undefined,
  zoneName: string | undefined,
  hostedZone: HostedZone
}

export class AppCommonCertificateStack extends Stack {
  public readonly certificate: Certificate;

  constructor(scope: Construct, id: string, props: AppCommonCertificateStackProps) {
    super(scope, id, props);

    const {projectKey} = props;
    const {zoneName} = props;
    const {hostedZone} = props;


    this.certificate = new Certificate(this, `${projectKey}DomainCertificate`, {
      domainName: `${zoneName}`,
      validation: CertificateValidation.fromDns(hostedZone),
      subjectAlternativeNames: [`*.${zoneName}`]
    });

  }

}
