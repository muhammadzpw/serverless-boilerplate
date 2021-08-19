import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: 'lambda-nestjs-app',
  package: {
    individually: true,
  },
  plugins: [
    'serverless-plugin-typescript',
    // 'serverless-plugin-optimize',
    'serverless-deployment-bucket',
    'serverless-offline',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    deploymentBucket: {
      name: 'mzpw-staging',
    },
    role: 'arn:aws:iam::417985917364:role/serverless_lambda',
  },
  functions: {
    main: {
      handler: 'src/lambda.handler',
      events: [
        {
          http: {
            method: 'ANY',
            path: '/',
          },
        },
        {
          http: {
            method: 'ANY',
            path: '{proxy+}',
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
