import {BlockPublicAccess, Bucket, HttpMethods} from "aws-cdk-lib/aws-s3";
import {RemovalPolicy, Stack, StackProps} from "aws-cdk-lib";
import {Construct} from 'constructs';
import {BucketDeployment, Source} from "aws-cdk-lib/aws-s3-deployment";

interface WebsiteBucketStackProps extends StackProps {
  pathToArchive: string
  pathToArchiveDir: string
}


export class WebsiteBucketStack extends Stack {

  public readonly websiteBucket: Bucket;

  // public readonly cloudfrontOAI: cloudfront.CloudFrontWebDistribution;

  constructor(scope: Construct, id: string, props: WebsiteBucketStackProps) {
    super(scope, id, props);

    const {pathToArchive} = props;
    const {pathToArchiveDir} = props;

    const websiteBucket = new Bucket(this, 'WebsiteBucket', {
      // blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      cors: [
        {
          allowedOrigins: ["*"],
          allowedMethods: [HttpMethods.GET],

          maxAge: 3000,
        },
      ],
      bucketName: 'edwincruz-com--dev',
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY, // NOT recommended for production code
      autoDeleteObjects: true, // NOT recommended for production code
      transferAcceleration: true,
    });

    console.log('Path to zip archive: ' + pathToArchive);
    new BucketDeployment(this, 'DeployWebsite', {
      sources: [Source.asset(pathToArchive)],
      destinationBucket: websiteBucket,
      prune: true,

      retainOnDelete: false,
      memoryLimit: 1024,
    });
    this.websiteBucket = websiteBucket;

  }
}
