export const genUUID = () => {
  return `${new Date().getTime()}_byfe_${Math.floor(Math.random() * 1000)}`
}

function isObject(val: any) {
  return typeof val === 'object' && val !== null
}

export function deepClone(obj: any, hash = new WeakMap()) {
  if (!isObject(obj)) return obj

  // if (hash.has(obj)) {
  //   return hash.get(obj);
  // }

  const target = Array.isArray(obj) ? [] : ({} as any)

  // hash.set(obj, target);

  Reflect.ownKeys(obj).forEach((item) => {
    if (isObject(obj[item])) {
      // 递归的点
      target[item] = deepClone(obj[item], hash)
    } else {
      target[item] = obj[item]
    }
  })

  return target
}
