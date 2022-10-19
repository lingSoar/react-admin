/**
 * @description 根据屏幕宽度动态设置根字体大小，rem布局
 * @return void
 */
const recalculate = () => {
  // 获取html 元素
  const docElement = document.documentElement || document.body
  // 获取可视窗口宽度大小
  let clientWidth = docElement.clientWidth
  // 默认pc 端的设计稿宽度
  let designWidth = 1440

  if (clientWidth < 750) {
    // 屏幕太小则使用移动端的设计稿宽度
    designWidth = 640
  } else if (clientWidth < designWidth) {
    clientWidth -= 80
  } else {
    clientWidth = designWidth
  }

  docElement.style.fontSize = (clientWidth / designWidth) * 100 + 'px'
}

window.addEventListener('resize', recalculate)

export default recalculate