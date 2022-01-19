import {Stack, StackProps} from "aws-cdk-lib";
import {Construct} from 'constructs';


export class ZipWebsiteContentsStack extends Stack {

  public readonly pathToArchive: string;
  public readonly pathToArchiveExtracted: string;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.pathToArchive = __dirname + '/../cdk.out/edwincruz-com--dev.zip';
    this.pathToArchiveExtracted = __dirname + '/../cdk.out/edwincruz-com--dev'

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
    unzipFile(this.pathToArchive, this.pathToArchiveExtracted).then(r => console.log('extraction done!'));

  }

}
