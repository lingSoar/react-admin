/**
 * @debounce 防抖函数，只执行规定时间内触发的最后一次
 * 所谓防抖，就是指触发事件后，n 秒后才执行函数，如果在n 秒内又触发了事件，则会重新计算函数执行时间。
 */
export const debounce = (fn: () => void, time: number) => {
  let timerID: any = null
  return (...rest: any) => {
    if (timerID) {
      clearTimeout(timerID)
      timerID = null
    }
    timerID = setTimeout(() => {
      fn.apply(this, rest)
    }, time)
  }
}

/**
 * @throttle 节流函数，只执行规定时间内的第一次
 * 所谓节流，就是指连续触发事件，但是在n 秒中只执行一次函数，节流会稀释函数的执行频率
 */
export const throttle = (fn: () => void, time: number) => {
  let startDate = Date.now()
  return (...rest: any) => {
    const endDate = Date.now()
    if (endDate - startDate >= time) {
      fn.apply(this, rest)
      startDate = Date.now()
    }
  }
}

/**
 * @roughFormattingTime 粗略计算时间格式
 */
export const roughFormattingTime = (time: number | string) => {
  // 距离现在的时间戳（秒）
  // const s = Math.round((Date.now() - Date.parse(time)) / 1000)

  const s = Number(time)
  if (s / 60 < 1) return Math.floor(s) + '秒'
  if (s / 60 / 60 < 1) return Math.floor(s / 60) + '分钟'
  if (s / 60 / 60 / 24 < 1) return Math.floor(s / 3600) + '小时'
  if (s / 60 / 60 / 24 / 30 < 1) return Math.floor(s / 3600 / 24) + '天'
  if (s / 60 / 60 / 24 / 30 / 30 < 1) return Math.floor(s / 3600 / 24 / 30) + '个月'

  return Math.floor(s / 60 / 60 / 24 / 30 / 12) + '年'
}

/**
 * @carefulFormattingTime 精确计算时间格式
 */
export const carefulFormattingTime = (time: number | string) => {
  // 距离现在的时间戳（秒）
  // const s = Math.round((Date.now() - Date.parse(time)) / 1000)
  const s = Number(time)
  const handleFormat = (target: number) => (target >= 10 ? target : '0' + target)

  // 精确到秒
  if (s / 60 < 1) return Math.floor(s) + '秒'

  // 精确到分秒
  if (s / 60 / 60 < 1) {
    const m = Math.floor(s / 60)
    const sec = s - m * 60

    return `${m}分${handleFormat(sec)}秒`
  }

  // 精确到时分秒
  if (s / 60 / 60 / 24 < 1) {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s - h * 3600) / 60)
    const sec = s - h * 3600 - m * 60

    return `${h}小时${handleFormat(m)}分${handleFormat(sec)}秒`
  }

  // 精确到天时分秒
  if (s / 60 / 60 / 24 / 30 < 1) {
    const day = Math.floor(s / 24 / 3600)
    const h = Math.floor((s - day * 24 * 3600) / 3600)
    const m = Math.floor((s - day * 24 * 3600 - h * 3600) / 60)
    const sec = s - day * 24 * 3600 - h * 3600 - m * 60

    return `${day}天${handleFormat(h)}小时${handleFormat(m)}分${handleFormat(sec)}秒`
  }

  // 精确到月天时分秒
  if (s / 60 / 60 / 24 / 30 / 30 < 1) {
    const month = Math.floor(s / 30 / 24 / 3600)
    const day = Math.floor((s - month * 30 * 24 * 3600) / 24 / 3600)
    const h = Math.floor((s - month * 30 * 24 * 3600 - day * 24 * 3600) / 3600)
    const m = Math.floor((s - month * 30 * 24 * 3600 - day * 24 * 3600 - h * 3600) / 60)
    const sec = s - month * 30 * 24 * 3600 - day * 24 * 3600 - h * 3600 - m * 60

    return `${month}个月${handleFormat(day)}天${handleFormat(h)}小时${handleFormat(m)}分${handleFormat(sec)}秒`
  }

  // 精确到年月天时分秒
  const handleYear = (s: number) => {
    const year = Math.floor(s / 12 / 30 / 24 / 3600)
    const month = Math.floor((s - year * 12 * 30 * 24 * 3600) / 30 / 24 / 3600)
    const day = Math.floor((s - year * 12 * 30 * 24 * 3600 - month * 30 * 24 * 3600) / 24 / 3600)
    const h = Math.floor((s - year * 12 * 30 * 24 * 3600 - month * 30 * 24 * 3600 - day * 24 * 3600) / 3600)
    const m = Math.floor((s - year * 12 * 30 * 24 * 3600 - month * 30 * 24 * 3600 - day * 24 * 3600 - h * 3600) / 60)
    const sec = s - year * 12 * 30 * 24 * 3600 - month * 30 * 24 * 3600 - day * 24 * 3600 - h * 3600 - m * 60

    return `${year}年${handleFormat(month)}个月${handleFormat(day)}天${handleFormat(h)}小时${handleFormat(m)}分${handleFormat(sec)}秒`
  }
  return handleYear(s)
}

/**
 * @deepClone 深拷贝
 */
export const deepClone = (target: any, hashMap: WeakMap<any, any> = new WeakMap()) => {
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

/**
 * @formatDate 格式化时间戳
 */
type TBFormat = 'L' | 'LL' | 'LLL' | 'LLLL' | 'LLLLL' | 'LLLLLL' | 'LLLLLLL' | 'LLLLLLLL' | 'LLLLLLLLL' | 'LLLLLLLLLL' | 'X' | 'XX' | 'XXX' | 'XXXX'
type TMFormat = 'l' | 'll' | 'lll' | 'llll' | 'lllll' | 'llllll' | 'lllllll' | 'llllllll' | 'x' | 'xx' | 'xxx' | 'xxxx'
type TFormat = TBFormat | TMFormat | undefined

export const formatDate = (date: number | string | Date, format: TFormat = 'LLLLLLLLLL') => {
  const t = new Date(Number(date))
  const year = t.getFullYear()
  const month = t.getMonth()
  const day = t.getDate()
  const hour = t.getHours()
  const minute = t.getMinutes()
  const second = t.getSeconds()

  const relMonth = month + 1
  const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  const handleDigit = (time: number) => time < 10 ? '0' + time : time

  const resMonth = handleDigit(relMonth)
  const resDay = handleDigit(day)
  const resHour = handleDigit(hour)
  const resMinute = handleDigit(minute)
  const resSecond = handleDigit(second)

  switch (format) {
    case 'L': /* YYYY年  2019年 */
      return `${year}年`
    case 'l':  /* YYYY  2019 */
      return year
    case 'LL':  /* MMMM  五月 */
      return months[month]
    case 'll':  /* MMM  5月 */
      return `${relMonth}月`
    case 'LLL': /* DD日  06日 */
      return `${resDay}日`
    case 'lll': /* DD  16 */
      return day
    case 'LLLL': /* YYYY年MM月  2019年05月 */
      return `${year}年${resMonth}月`
    case 'llll': /* YYYYMM  201905 */
      return `${year}${resMonth}`
    case 'LLLLL': /* YYYY年MM月DD日  2019年05月16日 */
      return `${year}年${resMonth}月${resDay}日`
    case 'lllll': /* 	YYYY年M月D日  2019年5月16日 */
      return `${year}年${relMonth}月${day}日`
    case 'LLLLLL': /* YYYY/MM/DD	2019/05/16 */
      return `${year}/${resMonth}/${resDay}`
    case 'llllll': /* YYYY/M/D  2019/5/16 */
      return `${year}/${relMonth}/${day}`
    case 'LLLLLLL': /* YYYY-MM-DD	 2019-05-16 */
      return `${year}-${resMonth}-${resDay}`
    case 'lllllll': /* YYYY-M-D 	2019-5-16 */
      return `${year}-${relMonth}-${day}`
    case 'LLLLLLLL': /* YYYYMMDD  20190516 */
      return `${year}${resMonth}${resDay}`
    case 'llllllll': /* YYYYMD  2019516 */
      return `${year}${relMonth}${day}`
    case 'LLLLLLLLL': /* YYYY/MM/DD HH:mm  2019/05/16 09:10:48 */
      return `${year}/${resMonth}/${resDay} ${resHour}:${resMinute}:${resSecond}`
    case 'LLLLLLLLLL': /* YYYY-MM-DD HH:mm  2019-05-16 09:10 */
      return `${year}-${resMonth}-${resDay} ${resHour}:${resMinute}`
    case 'x': /* HH:mm  18:18 */
      return `${resHour}:${resMinute}`
    case 'xx': /* MM月  06月 */
      return `${resMonth}月`
    case 'xxx': /* YYYY /  2020 / */
      return `${year}/`
    case 'X': /* MM  01 */
      return resMonth
    case 'XX': /* MM.DD.YYYY	01.01.2020 */
      return `${resMonth}.${resDay}.${year}`
    case 'XXX': /* YYYY.MM.DD  2020.01.01 */
      return `${year}.${resMonth}.${resDay}`
    case 'XXXX': /* MM-DD HH:mm  05-01 09:06 */
      return `${resMonth}-${resDay} ${resHour}:${resMinute}`
    case 'xxxx': /* M-D H:m  5-1 9:6 */
      return `${relMonth}-${day} ${hour}:${minute}`
    default:
      return date
  }
}

/**
 * @isType 判断数据类型
 */
export const isType = (val: any) => {
  if (val === null) return 'null'
  if (typeof val !== 'object') return typeof val

  return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase()
}
