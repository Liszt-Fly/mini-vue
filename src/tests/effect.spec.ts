import { describe, it, expect } from 'vitest'
import { reactive } from '../reactivity/reactive';
import { effect } from '../reactivity/effect';
describe("effect", () => {
    it("happy path", () => {
        const user = reactive({
            age: 10
        })
        let nextAge;
        console.log(1)
        effect(() => {
            nextAge = user.age + 1
        })
        expect(nextAge).toBe(11)
        console.log(2)
        user.age++
        console.log(3)
        expect(nextAge).toBe(12)
    })
})