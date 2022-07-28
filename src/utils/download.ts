/**
 * @download 支持图片下载
 */
const download = (link: string, picName?: string): void => {
  // 创建一个img，等价于 document.createElement('img')
  const img: HTMLImageElement = new Image()
  /**
   * 给图片设置属性：img.crossOrigin = Anonymous => 该属性是当前图片元素的跨域资源共享 (CORS) 设置
   * img.setAttribute(name, value) => img.setAttribute('crossOrigin', 'Anonymous') => img.crossOrigin = 'Anonymous'
   */
  img.setAttribute('crossOrigin', 'Anonymous')
  // 图片加载完成触发的事件
  img.onload = () => {
    // 创建一个canvas
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d')
    canvas.width = img.width
    canvas.height = img.height
    // 绘制canvas 图像
    context?.drawImage(img, 0, 0, img.width, img.height)
    // HTMLCanvasElement.toBlob() 方法创造 Blob 对象，用以展示 canvas 上的图片；这个图片文件可以被缓存或保存到本地（由用户代理自行决定）
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob as Blob)
      const a: HTMLAnchorElement = document.createElement('a')
      // 创建一个点击事件
      const event = new MouseEvent('click')
      // 设置a 链接的download 属性，让浏览器指向文件下载（表示文件的下载名称）
      a.download = picName || 'default.png'
      a.href = url
      // 触发a 链接的点击事件
      a.dispatchEvent(event)
      // 内存管理，将这句代码注释掉，则将以 blob:http 开头的url 复制到浏览器地址栏有效，否则无效.
      URL.revokeObjectURL(url)
    })
  }
  img.src = `${link}?v=${Date.now()}`
}

export default download