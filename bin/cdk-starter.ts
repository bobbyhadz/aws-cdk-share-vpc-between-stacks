#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import {LambdaStack, VPCStack} from '../lib/cdk-starter-stack';

const app = new cdk.App();

const vpcStack = new VPCStack(app, 'vpc-stack', {
  stackName: 'vpc-stack',
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});

const lambdaStack = new LambdaStack(app, 'lambda-stack', {
  // 👇 pass the VPC from the other stack
  vpc: vpcStack.vpc,
  stackName: 'lambda-stack',
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
