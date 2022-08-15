import { add } from "../reactivity"
it("init", () => {
    expect(add(1, 2)).toBe(3)
})