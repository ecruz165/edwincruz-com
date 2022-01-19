import {App, Stack, StackProps} from "aws-cdk-lib";
import {Certificate, CertificateValidation, DnsValidatedCertificate} from "aws-cdk-lib/aws-certificatemanager";
import {HostedZone} from "aws-cdk-lib/aws-route53";

interface CertificateStackProps extends StackProps {
  hostedZone: HostedZone;
}

export class CertificateStack extends Stack {

  public readonly certificate: Certificate;

  constructor(scope: App, id: string, props?: CertificateStackProps) {
    super(scope, id, props);

    // @ts-ignore
    const {hostedZone} = props;

    let alternativeNames: string[] = [];
    this.certificate = new DnsValidatedCertificate(this, 'Certificate', {
      domainName: 'dev.edwincruz.com',
      subjectAlternativeNames: alternativeNames,
      hostedZone: hostedZone,
      validation: CertificateValidation.fromDns(hostedZone),
    });

  }

}
