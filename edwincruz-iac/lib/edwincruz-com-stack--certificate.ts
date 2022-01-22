import {App, CfnOutput, Stack, StackProps} from "aws-cdk-lib";
import {
  Certificate,
  CertificateValidation,
  DnsValidatedCertificate,
  ValidationMethod
} from "aws-cdk-lib/aws-certificatemanager";
import {HostedZone} from "aws-cdk-lib/aws-route53";

interface CertificateStackProps extends StackProps {
  hostedZone: HostedZone;
}

export class CertificateStack extends Stack {



  public readonly certificate: Certificate;

  constructor(scope: App, id: string, props: CertificateStackProps) {
    super(scope, id, props);

    // @ts-ignore
    const {hostedZone} = props;

    console.log("If you are using an external Registrar, update Name Servers:")
    for (let n in hostedZone.hostedZoneNameServers)
    {
      console.log("- "+ n);
    }

    let alternativeNames: string[] = ['dev.edwincruz.com'];
    const certificate = new Certificate(this, "ECDomainCertificate", {
      domainName: 'dev.edwincruz.com',
      subjectAlternativeNames: alternativeNames,
      validation:CertificateValidation.fromDns(hostedZone),
    });

    const certificateArn = certificate.certificateArn;
    new CfnOutput(this, "ECCertificateArn", {
      value: certificateArn,
    });

  }

}
