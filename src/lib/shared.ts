export const EMPTY = Symbol('empty')
export type MatchContext = string | typeof EMPTY
export type MatchValue = string | typeof EMPTY

export type RuleMemory<T = any> = Record<string | symbol, T>

export type Handler<T = any> = (
    memory: RuleMemory<T>,
    data: { context: MatchContext; value: MatchValue; match: RegExpMatchArray },
) => boolean | 'continue' // keep class | continue to next rule
