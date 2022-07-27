import React from 'react'
import useLazyImgs from '@/hooks/useLazyImgs'

const Practice: React.FC = () => {
  const imgs = []
  for (let i = 5; i < 30; i++) {
    imgs.push(
      {
        id: i,
        src: `https://www.maojiemao.com/public/svg/gen${i}.png`,
      }
    )
  }

  // 图片样式
  const imgsStyle = {
    width: '100px',
    height: '100px',
    margin: '20px auto',
    display: 'block',
  }

  // 使用自定义的useImgsLazy，获取到懒加载的图片数组
  const images = useLazyImgs(imgs, imgsStyle)

  return (
    <>
      <div>练习</div>
      <div style={{ border: '1px solid red', width: '200px', overflow: 'auto', height: '90%' }} >
        {images}
      </div>
    </>
  )
}

export default Practice