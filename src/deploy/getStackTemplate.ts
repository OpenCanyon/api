/* eslint-disable new-cap */
import cloudform, {DeletionPolicy, Fn, S3} from 'cloudform';
import {UpdateStackOptions} from './updateStack';

export default ({app: appName, branch: branchName}: UpdateStackOptions) => (cloudform({
    Description: `${appName}--${branchName}`,

    Outputs: {
        url: {
            Value: Fn.GetAtt('Bucket', 'WebsiteURL')
        },
    },

    Resources: {
        Bucket: new S3.Bucket({
            BucketName: `${appName}--${branchName}`,
            PublicAccessBlockConfiguration: {
                BlockPublicAcls: false,
                BlockPublicPolicy: false,
                IgnorePublicAcls: false,
                RestrictPublicBuckets: false,
            },
            WebsiteConfiguration: {
                IndexDocument: 'index.html',
            },
        }).deletionPolicy(DeletionPolicy.Delete),

        BucketPolicy: new S3.BucketPolicy({
            Bucket: Fn.Ref('Bucket'),
            PolicyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Effect: 'Allow',
                        Principal: '*',
                        Action: ['s3:GetObject'],
                        Resource: [
                            Fn.Join('', [Fn.GetAtt('Bucket', 'Arn'), '/*']),
                        ],
                    },
                ],
            },
        }).dependsOn(['Bucket']),
    },
})
);
