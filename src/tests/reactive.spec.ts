import { reactive } from "../reactivity/reactive"

describe("reactive", () => {
    it("happy_path", () => {
        const original = { foo: 1 }
        const observed = reactive(original)
        expect(observed).not.toBe(original)
        expect(observed.foo).toBe(1)
    })
})