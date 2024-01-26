/* eslint-disable max-classes-per-file */
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';
import * as path from 'path';

export class VPCStack extends cdk.Stack {
  // 👇 set a property for the vpc
  public readonly vpc: ec2.Vpc;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.vpc = new ec2.Vpc(this, 'my-vpc', {
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
      natGateways: 0,
      subnetConfiguration: [
        {
          name: 'public-subnet-1',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
      ],
    });
  }
}

// 👇 extend the props interface of LambdaStack
interface LambdaStackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
}

export class LambdaStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const {vpc} = props;

    cdk.Tags.of(vpc).add('environment', 'development');
    cdk.Tags.of(vpc).add('department', 'dpt123');

    // 👇 lambda function definition
    const lambdaFunction = new lambda.Function(this, 'lambda-function', {
      // 👇 place lambda in shared VPC
      vpc,
      allowPublicSubnet: true,
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.main',
      code: lambda.Code.fromAsset(path.join(__dirname, '/../src/my-lambda')),
      environment: {
        // 👇 pass the VPC ID as an environment variable
        VPC_ID: vpc.vpcId,
      },
    });
  }
}
