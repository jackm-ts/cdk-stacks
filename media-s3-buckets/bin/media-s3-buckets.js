#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { MediaS3BucketsStack } = require('../lib/media-s3-buckets-stack');

const ENV_NAME = process.env.ENV_NAME;

const TEST_ENV_CONFIG = {account: '469973828956', region: 'us-east-1'};
const PROD_ENV_CONFIG = {account: '085000587756', region: 'us-east-1'};
const ENV_CONFIG = (ENV_NAME == 'prod' ? PROD_ENV_CONFIG : TEST_ENV_CONFIG);

const bucket_names = [
    'document'
];

const app = new cdk.App();
new MediaS3BucketsStack(app, 'MediaS3BucketsStack', {
    env: ENV_CONFIG,
    envName: ENV_NAME,
    bucketNames: bucket_names
});
