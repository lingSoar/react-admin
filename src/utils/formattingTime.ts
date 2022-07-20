const formattingTime = (time: string) => {
  // 距离现在的时间戳（秒）
  const s = Math.round((Date.now() - Date.parse(time)) / 1000)

  if (s / 60 < 1) return Math.floor(s)

  return (
    s / 60 < 1
      ? Math.floor(s) + '秒前'
      : s / 60 / 60 < 1
        ? Math.floor(s / 60) + '分钟前'
        : s / 60 / 60 / 24 < 1
          ? Math.floor(s / 60 / 60) + '小时前'
          : s / 60 / 60 / 24 / 30 < 1
            ? Math.floor(s / 60 / 60 / 24) + '天前'
            : s / 60 / 60 / 24 / 30 / 12 < 1
              ? Math.floor(s / 60 / 60 / 24 / 30) + '个月前'
              : Math.floor(s / 60 / 60 / 24 / 30 / 12) + '年前'
  )

}

export default formattingTime