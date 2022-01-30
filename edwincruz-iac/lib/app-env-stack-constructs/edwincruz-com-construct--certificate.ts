import {App, CfnOutput, Stack, StackProps} from "aws-cdk-lib";
import {Certificate, CertificateValidation} from "aws-cdk-lib/aws-certificatemanager";
import {HostedZone, IHostedZone} from "aws-cdk-lib/aws-route53";
import {Construct} from "constructs";

interface CertificateStackProps {
  hostedZone: IHostedZone;
}

export class CertificateConstruct extends Construct {

  public readonly certificate: Certificate;

  constructor(scope: Construct, id: string, props: CertificateStackProps) {
    super(scope, id);

    const {hostedZone} = props;


    this.certificate = new Certificate(this, "ECDomainCertificate", {
      domainName: 'edwincruz.com',
      validation: CertificateValidation.fromDns(hostedZone),
    });


    new CfnOutput(this, "ECCertificateArn", {
      value: this.certificate.certificateArn,
    });

  }

}
