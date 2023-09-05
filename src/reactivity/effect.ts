class ReactiveEffect {
    private _fn;
    constructor(fn) {
        this._fn = fn;
    }
    run() {
        activeEffect = this;
        return this._fn();
    }
}
//维护一个指针,指向当前正在使用的effect
let activeEffect;
//每次执行effect函数,effect内部的函数首先会执行一次
export function effect(fn) {
    //fn
    const _effect = new ReactiveEffect(fn);
    const runner = _effect.run.bind(_effect)
    runner()
    return runner
}
//首先创建一个map用于存储所有的target
const targetMap = new Map()
//依赖追踪
export function track(target, key) {
    //targetMap->keymap->fn
    //首先根据targetMap去获取对应的keyMap
    let keyMap: Map<string, any> = targetMap.get(target)
    if (!keyMap) {
        keyMap = new Map()
        targetMap.set(target, keyMap)
    }
    //根据keyMap去寻找对应的Fn Set
    let FnSet: Set<any> = keyMap.get(key)
    if (!FnSet) {
        FnSet = new Set()
        keyMap.set(key, FnSet)
    }
    //将当前状态活跃的effect存入FnSet这个容器
    FnSet.add(activeEffect)
}

export function trigger(target, key) {
    //原理是从target找到key,然后key在找到FnSet,把FnSet里的所有effect拿出来运行
    let keyMap = targetMap.get(target)
    let FnSet = keyMap.get(key)

    for (const effect of FnSet) {
        effect.run()
    }
}