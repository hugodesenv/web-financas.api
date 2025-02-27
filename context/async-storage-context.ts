import { AsyncLocalStorage } from "async_hooks";
import { IPubStorage } from "../types/api-type";
import { Partial } from "@sinclair/typebox";

const _asyncLocalStorage = new AsyncLocalStorage<IPubStorage | Partial<IPubStorage>>();

export const pubStorage = {
  run: async (pub: IPubStorage | Partial<IPubStorage>, onCallback: () => Promise<any>) => {
    await _asyncLocalStorage.run(pub, onCallback);
  },
  set: (pub: IPubStorage) => {
    _asyncLocalStorage.enterWith(pub);
    console.log('aqui no set', _asyncLocalStorage.getStore())
  },
  get: (): Partial<IPubStorage> => {
    console.log('aqui no get', _asyncLocalStorage.getStore())
    return _asyncLocalStorage.getStore() ?? {};
  },
}