import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import {Duration, Construct} from '@aws-cdk/core'
import {IFunction} from '@aws-cdk/aws-lambda'
const testLambda =  (scope: Construct): IFunction => {

  return new lambda.Function(scope, 'testFunction', {
    code: lambda.Code.fromAsset('./dist/fleet'),
    handler: 'index.main',
    runtime: lambda.Runtime.NODEJS_12_X,
    memorySize: 512,
    tracing: lambda.Tracing.PASS_THROUGH,
  })

}

export class AsynchooksStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
  }
}
