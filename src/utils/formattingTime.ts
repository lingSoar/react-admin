/**
 * 1、粗略计算时间格式
 */
const roughFormattingTime = (time: number | string) => {
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
 * 2、精确计算时间格式
 */
const carefulFormattingTime = (time: number | string) => {
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


export {
  roughFormattingTime,
  carefulFormattingTime
}