/**
 * 性能优化的函数，防抖、节流
 */

/**
 * @debounce 防抖函数，只执行规定时间内触发的最后一次
 * 所谓防抖，就是指触发事件后，n 秒后才执行函数，如果在n 秒内又触发了事件，则会重新计算函数执行时间。
 */
const debounce = (fn: () => void, time: number) => {
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
const throttle = (fn: () => void, time: number) => {
  let startDate = Date.now()
  return (...rest: any) => {
    const endDate = Date.now()
    if (endDate - startDate >= time) {
      fn.apply(this, rest)
      startDate = Date.now()
    }
  }
}

export {
  throttle,
  debounce
}
