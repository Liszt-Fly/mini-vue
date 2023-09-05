import { track, trigger } from "./effect"

export function reactive(target: any) {
    let proxy = new Proxy(target, {
        get: (target, property) => {
            console.log("getter")
            //依赖收集
            track(target, property)
            // console.log('我进行依赖收集啦!', target, property)
            return Reflect.get(target, property)
        },
        set: (target, property, newValue) => {
            //触发依赖
            Reflect.set(target, property, newValue)
            trigger(target, property)
            console.log("我触发了依赖")
            return newValue
        }

    })
    return proxy
}