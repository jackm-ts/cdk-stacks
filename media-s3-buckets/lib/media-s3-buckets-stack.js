const cdk = require('@aws-cdk/core');
const s3 = require('@aws-cdk/aws-s3');
const iam = require('@aws-cdk/aws-iam');

class MediaS3BucketsStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    var media_buckets = {}

    props.bucketNames.forEach(name => {
      var s3bucket = new s3.Bucket(this, `${name}Bucket`, {
        bucketName: `${name}-msg-${props.envName}`,
        encryption: s3.BucketEncryption.S3_MANAGED,
        versioned: true,
        removalPolicy: cdk.RemovalPolicy.DESTROY
      });

      s3bucket.addToResourcePolicy(new iam.PolicyStatement({
        effect: iam.Effect.DENY,
        principals: [new iam.Anyone()],
        actions: [
          's3:GetObject',
          's3:PutObject'
        ],
        resources: [
          `${s3bucket.bucketArn}/*`,
          `${s3bucket.bucketArn}`
        ],
        conditions: {
          'Bool': {'aws:SecureTransport': false}
        }
      }));

      s3bucket.addToResourcePolicy(new iam.PolicyStatement({
        effect: iam.Effect.DENY,
        principals: [new iam.AccountPrincipal(props.env.account)],
        actions: [
          's3:GetObject',
          's3:PutObject'
        ],
        resources: [
          `${s3bucket.bucketArn}/*`,
          `${s3bucket.bucketArn}`
        ]
      }));

      s3bucket.addCorsRule({
        allowedOrigins: ['*'],
        allowedMethods: [s3.HttpMethods.GET],
        allowedHeaders: [
          'Authorization',
          'x-amz-server-side-encryption-customer-algorithm',
          'x-amz-server-side-encryption-customer-key'
        ],
        maxAge: 3000
      });

      s3bucket.addCorsRule({
        allowedOrigins: ['*'],
        allowedMethods: [s3.HttpMethods.POST],
        allowedHeaders: [
          'Authorization',
          'x-amz-server-side-encryption-customer-algorithm',
          'x-amz-server-side-encryption-customer-key',
          'x-amz-server-side-encryption-customer-key-MD5'
        ],
        maxAge: 3000
      });

      media_buckets[name] = s3bucket
    });
  }
}

module.exports = { MediaS3BucketsStack }
