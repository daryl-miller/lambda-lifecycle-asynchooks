import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda-nodejs'
import {Construct} from '@aws-cdk/core'
import {IFunction} from '@aws-cdk/aws-lambda'

const testLambda =  (scope: Construct): IFunction => {

  return new lambda.NodejsFunction(scope, 'testFunction', {
    entry: './src/index.ts',
    handler: 'main'
  })

}

export class AsyncHooksStack extends cdk.Stack {

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    testLambda(this)

  }
}
