import {Environment} from "aws-cdk-lib";
import {Construct} from 'constructs';

interface ZipWebsiteContentsConstructProps {
  env: Environment,
  projectName: string | undefined,
  envName: string | undefined,
  envLabel: string | undefined
}

export class ZipWebsiteContentsConstruct extends Construct {

  public readonly pathToArchive: string;
  public readonly pathToArchiveExtracted: string;

  constructor(scope: Construct, id: string, props: ZipWebsiteContentsConstructProps) {
    super(scope, id);

    const {projectName} = props;
    const {envLabel} = props;

    this.pathToArchive = `${__dirname}/../../cdk.out/${projectName}--${envLabel}.zip`;
    this.pathToArchiveExtracted = `${__dirname}/../../cdk.out/${projectName}--${envLabel}`;

    const {envName} = props;

    const AdmZip = require("adm-zip");
    // creating archives
    const zip = new AdmZip();
    zip.addLocalFile('../lambda.js');
    zip.addLocalFolder('../dist/', '/dist');
    zip.addLocalFolder('../node_modules/type-is', '/node_modules/type-is');
    zip.addLocalFolder('../node_modules/mime-types', '/node_modules/mime-types');
    zip.addLocalFolder('../node_modules/mime-db', '/node_modules/mime-db');
    zip.addLocalFolder('../node_modules/media-typer', '/node_modules/media-typer');
    zip.addLocalFolder('../node_modules/binary-case', '/node_modules/binary-case');
    zip.addLocalFolder('../node_modules/aws-serverless-express', '/node_modules/aws-serverless-express');
    zip.addLocalFolder('../node_modules/@vendia', '/node_modules/@vendia');

    zip.writeZip(this.pathToArchive);

    const unzipFile = async function (source: string, targetDir: string) {
      const zip = new AdmZip(source);
      zip.extractAllTo(targetDir);
    }
    unzipFile(this.pathToArchive, this.pathToArchiveExtracted).then(r => console.log('Extraction complete!'));

  }

}
