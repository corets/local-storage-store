import { ObservableStore } from "@corets/store"

export type CreateLocalStorageStore = <TValue extends object>(
  storageKey: string,
  initialValue: TValue
) => ObservableStore<TValue>
