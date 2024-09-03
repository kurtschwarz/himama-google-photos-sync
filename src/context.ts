import { AsyncLocalStorage } from 'node:async_hooks'
import fs from 'node:fs'
import type { BaseLogger } from 'pino'

const storage = new AsyncLocalStorage<unknown>()

export interface Context {
  logger: BaseLogger
  sessionId: string
  storagePath: string
}

export const createContext = <T = Context>(args: Partial<T>): T => {
  return {
    ...args
  } as T
}

export const restoreContext = <T = Context>(storagePath: string, args: Partial<T>): T => {
  if (fs.existsSync(storagePath)) {
    args = {
      ...args,
      ...JSON.parse(fs.readFileSync(storagePath).toString('utf-8')),
      storagePath,
    }
  }

  return {
    ...args
  } as T
}

export const getContext = <T = Context>(): T => {
  return storage.getStore() as T
}

export const updateContext = <T = Context>(args: Partial<T>): T => {
  const context = {
    ...getContext(),
    ...args,
  }

  fs.writeFileSync('./data/.context.json', JSON.stringify(context, null, "  "))

  storage.enterWith(context)

  return getContext()
}

export const useContext = <R>(
  context: unknown,
  callback: (...args: unknown[]) => R
): R => {
  return (storage as AsyncLocalStorage<Parameters<typeof useContext>[0]>)
    .run(context, callback)
}
