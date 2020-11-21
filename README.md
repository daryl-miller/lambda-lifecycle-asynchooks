# Example of lambda lifecycle management

## Context

This repo is a quick demo on how lambdas can manage state using globals and displays the risk using exported variables that you import across your code. Async hooks wrap async promises and trigger based on the state of the promise (init, before, after). You can leverage this to wrap the main handler to initialise your global state, that cleans itself up when the handler finalises, allowing you to scope your state to just that lambda execution. This is really appealing in comparison to my current mechanism of relying on a globally exported variable that can leak into the next lambda execution. As demonstrated below if I update a global let or const that will persist if that same lambda is executed again.

## Usage

You can't see this issue using sam local because the lambda is not persisted between executions. To see this happen in the real world you will need to deploy to your aws account

- npm run cdk deploy
- Goto the aws console for lambda functions and setup a simple test function
- Execute the lambda using test over and over and look at the log output (Example below)

## Example output

In the example below I've executed the lambda function multiple times and this has caused my accidental global to accumulate more and more data between executions.

```log
START RequestId: 0813c1f3-8818-46ad-9cd5-62ab074562fb Version: $LATEST
2020-11-21T00:20:46.916Z 0813c1f3-8818-46ad-9cd5-62ab074562fb INFO before context has been set undefined
2020-11-21T00:20:46.916Z 0813c1f3-8818-46ad-9cd5-62ab074562fb INFO After Context has been set ["Setting context of logs"]
2020-11-21T00:20:46.916Z 0813c1f3-8818-46ad-9cd5-62ab074562fb INFO Sourcing context from a module: Setting context of logs
2020-11-21T00:20:46.917Z 0813c1f3-8818-46ad-9cd5-62ab074562fb INFO before accidentalGlobal:  [
  "This is why I can't have nice things: Sat Nov 21 2020 00:20:44 GMT+0000 (Coordinated Universal Time)",
  "This is why I can't have nice things: Sat Nov 21 2020 00:20:45 GMT+0000 (Coordinated Universal Time)",
  "This is why I can't have nice things: Sat Nov 21 2020 00:20:45 GMT+0000 (Coordinated Universal Time)",
  "This is why I can't have nice things: Sat Nov 21 2020 00:20:46 GMT+0000 (Coordinated Universal Time)"
]
2020-11-21T00:20:46.917Z 0813c1f3-8818-46ad-9cd5-62ab074562fb INFO after setting accidentalGlobal:  [
  "This is why I can't have nice things: Sat Nov 21 2020 00:20:44 GMT+0000 (Coordinated Universal Time)",
  "This is why I can't have nice things: Sat Nov 21 2020 00:20:45 GMT+0000 (Coordinated Universal Time)",
  "This is why I can't have nice things: Sat Nov 21 2020 00:20:45 GMT+0000 (Coordinated Universal Time)",
  "This is why I can't have nice things: Sat Nov 21 2020 00:20:46 GMT+0000 (Coordinated Universal Time)",
  "This is why I can't have nice things: Sat Nov 21 2020 00:20:46 GMT+0000 (Coordinated Universal Time)"
]
2020-11-21T00:20:46.917Z 0813c1f3-8818-46ad-9cd5-62ab074562fb INFO before returnGlobalState [ 'I should only exist once' ]
2020-11-21T00:20:46.917Z 0813c1f3-8818-46ad-9cd5-62ab074562fb INFO after setting returnGlobalState [ 'I should only exist once' ]
2020-11-21T00:20:46.917Z 0813c1f3-8818-46ad-9cd5-62ab074562fb INFO Finished execution
END RequestId: 0813c1f3-8818-46ad-9cd5-62ab074562fb
REPORT RequestId: 0813c1f3-8818-46ad-9cd5-62ab074562fb Duration: 2.21 ms Billed Duration: 100 ms Memory Size: 128 MB Max Memory Used: 66 MB
```

## Conclusion

Seems really cool, but I'm a bit dubious about leveraging an experimental feature in production. I'm normally all for leveraging experimental language features but normally these transpile into javascript. This is a native API(scarier than transpiling flatmap) and Node doesn't recommend it for production. There is also the inherit risk on storing a global 'state' map object. If the lambda doesn't properly garbage collect a rejected promise, or if the async hook doesn't properly remove an async hook from the state object you introduce the risk of memory leaks.

### References

- Async Hooks: <https://nodejs.org/api/async_hooks.html>

- Blog post on usage: <https://blog.scottlogic.com/2019/03/04/lambda-global-state.html>
