import {_accidentalGlobal, cacheGlobalState, returnGlobalState} from './env'
import {enable, getContext} from './context'
import {testContextFromModule} from './module'

export async function main(): Promise<any> {
  return enable(() => { //Wrapper for the function


    const context = getContext();
    console.log('before context has been set',context?.log)
    if (!context.log) {
      context.log = [];
    }

    context.log.push('Setting context of logs');
    console.log(`After Context has been set ${JSON.stringify(context.log)}`)
    testContextFromModule()

    console.log('before accidentalGlobal: ', _accidentalGlobal)
    _accidentalGlobal.push(`This is why I can't have nice things: ${new Date()}`)
    console.log('after setting accidentalGlobal: ', _accidentalGlobal)
  
    console.log('before returnGlobalState', returnGlobalState())
    cacheGlobalState(['I should only exist once'])
    console.log('after setting returnGlobalState', returnGlobalState())

    console.log('Finished execution')
  
    return {}
  })


}
