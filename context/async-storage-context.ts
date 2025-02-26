import { AsyncLocalStorage } from "async_hooks";
import { IPubStorage } from "../types/api-type";

const _asyncLocalStorage = new AsyncLocalStorage();

export const pubStorage = {
  run: async (pub: IPubStorage | Partial<IPubStorage>, onCallback: () => Promise<any>) => {
    await _asyncLocalStorage.run(pub, onCallback);
  },
  set: (pub: IPubStorage) => {
    _asyncLocalStorage.enterWith(pub);
  },
  get: (): Partial<IPubStorage> => {
    return _asyncLocalStorage.getStore() ?? {};
  },
}