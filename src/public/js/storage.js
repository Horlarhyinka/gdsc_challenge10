export function setItem(key, value){
    if(!key)return
    const str = JSON.stringify(value)
    localStorage.setItem(key, str)
    return value
}

export function getItem(key){
    if(!key)return;
    const target = localStorage.getItem(key)
    if(!target)return
    const parsed = JSON.parse(target)
    return parsed
}

export async function getOrSet(key, fn){
    const target = getItem(key)
    if(!target){
        const n = await fn()
        setItem(key, n)
        return n
    }
    return target
}