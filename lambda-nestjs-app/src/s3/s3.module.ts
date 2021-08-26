import { Module } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';

@Module({
  providers: [
    {
      provide: S3Client,
      useFactory: () =>
        new S3Client({
          region: 'us-east-1',
        }),
    },
  ],
})
export class S3Module {}
