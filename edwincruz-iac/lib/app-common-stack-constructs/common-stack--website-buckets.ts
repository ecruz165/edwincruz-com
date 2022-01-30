import {Bucket, HttpMethods} from "aws-cdk-lib/aws-s3";
import {Environment, RemovalPolicy} from "aws-cdk-lib";
import {Construct} from 'constructs';

interface WebsiteBucketConstructProps {
  env: Environment,
  projectKey: string | undefined,
  projectName: string | undefined,
  envLabel: string | undefined
}

export class WebsiteBucketConstruct extends Construct {

  public readonly websiteBucket: Bucket;

  constructor(scope: Construct, id: string, props: WebsiteBucketConstructProps) {
    super(scope, id);

    const {env} = props;
    const {projectKey} = props;
    const {projectName} = props;
    const {envLabel} = props;

    const bucketName = projectName + '--' + envLabel

    const websiteBucket = new Bucket(this, `${projectKey}WebsiteBucket`, {
      // blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      cors: [
        {
          allowedOrigins: ["*"],
          allowedMethods: [HttpMethods.GET],

          maxAge: 3000,
        },
      ],
      bucketName: `${bucketName}`,
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY, // NOT recommended for production code
      autoDeleteObjects: true, // NOT recommended for production code
      transferAcceleration: true,
    });

    this.websiteBucket = websiteBucket;

  }
}
