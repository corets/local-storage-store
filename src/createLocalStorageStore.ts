import { CreateLocalStorageStore } from "./types"
import {
  readLocalStorage,
  writeLocalStorage,
} from "@corets/local-storage-helpers"
import { createStore, ObservableStore } from "@corets/store"

const cache: Record<string, ObservableStore<any>> = {}

export const createLocalStorageStore: CreateLocalStorageStore = <
  TValue extends object
>(
  storageKey,
  initialValue
) => {
  let store = cache[storageKey] as ObservableStore<TValue>

  if (!store) {
    store = createStore(readLocalStorage(storageKey, initialValue))
    store.listen((newValue) => writeLocalStorage(storageKey, newValue))
    cache[storageKey] = store
  }

  return store
}
