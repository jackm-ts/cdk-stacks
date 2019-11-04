const { expect, matchTemplate, MatchStyle } = require('@aws-cdk/assert');
const cdk = require('@aws-cdk/core');
const MediaS3Buckets = require('../lib/media-s3-buckets-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new MediaS3Buckets.MediaS3BucketsStack(app, 'MyTestStack');
    // THEN
    expect(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});