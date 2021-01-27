import { createLocalStorageStore } from "./createLocalStorageStore"
import { Store } from "@corets/store"

describe("createLocalStorageStore", () => {
  it("creates a hook store attached to local storage", () => {
    const store1 = createLocalStorageStore("test", { foo: "bar" })

    expect(store1 instanceof Store).toBe(true)
    expect(store1.get()).toEqual({ foo: "bar" })
    expect(JSON.parse(localStorage.getItem("test")!)).toEqual({ foo: "bar" })

    store1.put({ yolo: "swag" } as any)

    expect(store1.get()).toEqual({ foo: "bar", yolo: "swag" })
    expect(JSON.parse(localStorage.getItem("test")!)).toEqual({
      foo: "bar",
      yolo: "swag",
    })

    const store2 = createLocalStorageStore("test", {})

    expect(store2.get()).toEqual({ foo: "bar", yolo: "swag" })
  })

  it("reuses instances based on the storage key", () => {
    const store1 = createLocalStorageStore("foo", { foo: "bar" })
    const store2 = createLocalStorageStore("bar", { foo: "bar" })
    const store3 = createLocalStorageStore("foo", { foo: "bar" })

    expect(store1 === store2).toBe(false)
    expect(store1 === store3).toBe(true)
  })
})
