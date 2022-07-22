/**
 * 深拷贝
 */
const deepClone = (target: any, hashMap: WeakMap<any, any> = new WeakMap()) => {
  // 自定义封装一个forEach 替代for in 遍历
  const _forEach = (array: any[], iteratee: (value: any, key: any) => void) => {
    let index = -1
    const length = array.length
    while (++index < length) {
      iteratee(array[index], index)
    }
  }

  // 引用数据类型则进行拷贝
  if (typeof target === 'object') {
    const isArray = Array.isArray(target)
    const cloneTarget: any = isArray ? [] : {}
    /**
     *   解决循环引用问题
     *     1. 我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，
     *     2. 当需要拷贝当前对象时，先去存储空间中找，是否有拷贝的这个对象，
     *     3. 如果有的话直接返回，
     *     4. 如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。
    */

    // WeakMap.prototype.get(key)：返回 WeakMap 中与 key 相关联的值，如果 key 不存在则返回 undefined
    if (hashMap.get(target)) return hashMap.get(target)

    // 给 WeakMap.prototype.set(key, value) 中的 key 设置一个 value。该方法返回一个 WeakMap 对象
    hashMap.set(target, cloneTarget)

    // 单纯是个对象则获取所有的键（key），数组的话直接遍历数组
    const keys = isArray ? undefined : Object.keys(target)

    // 如果是对象则遍历所有的key，数组则直接遍历数组
    _forEach(keys || target, (value, key) => {
      // 处理对象的键名，如果是当前遍历对象是数组，则直接使用索引，
      keys && (key = value)
      // 递归处理键值
      cloneTarget[key] = deepClone(target[key], hashMap)
    })

    return cloneTarget
  }

  // 非引用数据类型，直接返回
  return target
}


export default deepClone