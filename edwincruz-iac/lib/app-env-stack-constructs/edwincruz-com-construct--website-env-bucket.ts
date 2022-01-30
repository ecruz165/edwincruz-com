import {Bucket, IBucket} from "aws-cdk-lib/aws-s3";
import {Construct} from 'constructs';
import {BucketDeployment, Source} from "aws-cdk-lib/aws-s3-deployment";

interface WebsiteBucketStackProps {
  projectKey: string | undefined,
  bucketName: string | undefined,
  pathToArchive: string,
  pathToArchiveDir: string,
  envLabel: string | undefined
}


export class WebsiteEnvironmentBucketConstruct extends Construct {

  public readonly websiteBucket: IBucket;

  // public readonly cloudfrontOAI: cloudfront.CloudFrontWebDistribution;

  constructor(scope: Construct, id: string, props: WebsiteBucketStackProps) {
    super(scope, id);

    const {projectKey} = props;
    const {pathToArchive} = props;
    const {envLabel} = props;
    const {bucketName} = props;

    this.websiteBucket = Bucket.fromBucketName(
      this,
      `${projectKey}WebsiteBucket`,
      `${bucketName}`,
    );

    new BucketDeployment(this, 'DeployWebsite', {
      sources: [Source.asset(pathToArchive)],
      destinationBucket: this.websiteBucket,
      prune: true,

      retainOnDelete: false,
      memoryLimit: 1024,
    });

    this.websiteBucket = this.websiteBucket;

  }
}
