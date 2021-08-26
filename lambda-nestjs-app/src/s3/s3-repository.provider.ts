import { Provider } from '@nestjs/common';

export interface S3RepositoryFactoryInput {
  path: string;
  bucket?: string;
}
export function s3RepositoryFactory(input: S3RepositoryFactoryInput) {
  // TODO: S3 Repository
  return;
}

export function createS3RepositoryProvider(
  input: S3RepositoryFactoryInput,
): Provider<any> {
  return {
    // provide:
  };
}
