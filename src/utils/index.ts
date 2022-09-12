/**
 * @description 防抖函数，只执行规定时间内触发的最后一次
 * @param {void} fn 要执行的回调函数
 * @param {number} time 延迟执行的时间
 * @return () => void
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
 * @description 节流函数，只执行规定时间内的第一次（所谓节流，就是指连续触发事件，但是在n 秒中只执行一次函数，节流会稀释函数的执行频率)
 * @param {void} fn 要执行的回调函数
 * @param {number} time 延迟执行的时间
 * @return () => void
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
 * @description 粗略的计算时间格式
 * @param {number | string} time 需要处理的时间戳
 * @return string
 */
export const roughFormattingTime = (time: number | string): string => {
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
 * @description 比较精确的计算时间格式
 * @param {number | string} time 需要处理的时间戳
 * @return string
 */
export const carefulFormattingTime = (time: number | string): string => {
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
 * @description 深拷贝
 * @param {any} target 拷贝的对象
 * @param {any} hashMap 存储拷贝对象的map容器
 * @return any
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
 * @description 格式化时间戳
 * @param {number | string | Date} date 时间戳
 * @param {TFormat} format 格式化的数据模板
 * @return string | number | Date
 */
type TBFormat = 'L' | 'LL' | 'LLL' | 'LLLL' | 'LLLLL' | 'LLLLLL' | 'LLLLLLL' | 'LLLLLLLL' | 'LLLLLLLLL' | 'LLLLLLLLLL' | 'X' | 'XX' | 'XXX' | 'XXXX'
type TMFormat = 'l' | 'll' | 'lll' | 'llll' | 'lllll' | 'llllll' | 'lllllll' | 'llllllll' | 'x' | 'xx' | 'xxx' | 'xxxx'
type TFormat = TBFormat | TMFormat | undefined

export const formatDate = (date: number | string | Date, format: TFormat = 'LLLLLLLLLL'): string | number | Date => {
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
 * @description 判断数据类型
 * @param {any} val 需要判断类型的数据
 * @return string
 */
export const isType = (val: any): string => {
  if (val === null) return 'null'
  if (typeof val !== 'object') return typeof val

  return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase()
}

/**
 * @description 对数值进行四舍五入，默认保留两位小数，尾数为0 自动省略
 * @param {number | string} num 需要进行四舍五入的数据
 * @param {number} decimal 保留的位数
 * @return number
 */
export const handleRoundNum = (num: number | string, decimal = 2): number => {
  // 1、组装数据，先乘做处理，然后做除法
  // const targetNumber = Number(num)

  // // 保留几位小数，先翻倍进行四舍五入再保留位数
  // // const doubleNumber = Number(1 + ''.padEnd(decimal, '0'))
  // const doubleNumber = Number([1, ...(new Array(decimal)).fill(0)].join(''))
  // return Math.round(targetNumber * doubleNumber) / doubleNumber

  // 2、使用科学计数法，本质还是先乘后除
  const pair = `${num}e${decimal}`
  const value = Math.round(+pair)
  return +`${value}e${-decimal}`
}

/**
 * @description 对数值进行处理，实现千位分隔符
 * @param {number | string} num 需要处理的数据
 * @return string
 */
export const handleThousands = (num: number | string): string => {
  // 1、toLocaleString()
  return Number(num).toLocaleString('en-US')

  // 2、正则
  // return String(num).replace(/(\d)(?=(\d{3})+$)/g, '$1,')

  // 3、遍历
  // const resStr = String(num).split('').reverse().map((item, index) => {
  //   if ((index + 1) % 3 === 0) {
  //     return [item, ',']
  //   } else {
  //     return item
  //   }
  // }).flat().reverse().join('')

  // if (resStr[0] === ',') return resStr.slice(1)
  // return resStr
}

/**
 * @description 对运算进行处理，解决精度问题
 * @param {number[]} arr 需要运算的数据
 * @param {TType} type 运算的符号
 * @return number
 */
type TType = '+' | '-' | '*' | '/'

export const handlePrecision = (arr: number[], type: TType): number => {
  const isInteger = (arr: number[]) => arr.every(num => Number.isInteger(num))

  if (isInteger(arr)) {
    switch (type) {
      case '+':
        return arr.reduce((pre, num) => pre + num)
      case '-':
        return arr.reduce((pre, num) => pre - num)
      case '*':
        return arr.reduce((pre, num) => pre * num)
      case '/':
        return arr.reduce((pre, num) => pre / num)
      default:
        throw Error('type 应该为 + - * /')
    }
  }

  const handleNum = (arr: number[]) => {
    const nums = arr.map(num => String(num)).map(num => {
      if (!num.includes('.')) return num += '.'
      return num
    })

    const lengths = nums.map(num => String(num).split('.')[1].length)
    const max = Math.max(...lengths)
    // const maxStr = ''.padEnd(max, '0')
    // const number = Number(1 + ''.padEnd(max, '0'))

    // const res = nums.map(num => {
    //   const str = String(num) + maxStr
    //   const index = [...str].indexOf('.') + max
    //   const resStr = str.replace('.', '').slice(0, index)

    //   return Number(resStr)
    // })

    // 使用科学计数法
    const number = +`1e${max}`
    const res = nums.map(num => +`${+num}e${max}`)

    return [res, number]
  }

  const [nums, number] = handleNum(arr) as [number[], number]

  switch (type) {
    case '+':
      return nums.reduce((pre, num) => pre + num) / number
    case '-':
      return nums.reduce((pre, num) => pre - num) / number
    case '*':
      return nums.reduce((pre, num) => pre * num) / Math.pow(number, 2)
    case '/':
      return nums.reduce((pre, num) => pre / num)
    default:
      throw Error('type 应该为 + - * /')
  }
}