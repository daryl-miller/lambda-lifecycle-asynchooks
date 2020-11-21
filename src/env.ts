let _globalState: string[] | undefined

export let _accidentalGlobal: string[] = []

export const returnGlobalState = (): string[] => _globalState as string[]

export function cacheGlobalState(strings: string[]): void {
    _globalState = strings
}
