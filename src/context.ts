import {createHook, executionAsyncId} from 'async_hooks'

const state = new Map();

createHook({
    init: (asyncId: number, _, triggerId: number) => {
      state.set(asyncId, state.get(triggerId));
    },
    destroy: (asyncId: number) => state.delete(asyncId),
    promiseResolve: (asyncId: number) => state.delete(asyncId),
}).enable();

export const getContext = () => state.get(executionAsyncId());

export const enable = (fn: Function) => {
    const id = executionAsyncId();
    state.set(id, {});
    return fn();
  };