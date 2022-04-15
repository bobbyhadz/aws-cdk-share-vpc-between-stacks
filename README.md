# How to share a VPC between Stacks in AWS CDK

A repository for an article on
[bobbyhadz.com](https://bobbyhadz.com/blog/aws-cdk-share-vpc-between-stacks)

> If you use CDK v1, switch to the cdk-v1 branch

## How to Use

1. Clone the repository

2. Install the dependencies

```bash
npm install
```

3. Deploy the CDK stacks in the following order

```bash
npx aws-cdk deploy vpc-stack

npx aws-cdk deploy lambda-stack
```

4. Open the AWS CloudFormation Console and the stack should be created in your
   default region

5. Destroy the CDK stacks in the following order

```bash
npx aws-cdk destroy lambda-stack

npx aws-cdk destroy vpc-stack
```
