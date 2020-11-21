import {getContext} from './context'

export async function testContextFromModule() {
    const context = getContext();
    console.log(`Sourcing context from a module: ${context.log}`)
}