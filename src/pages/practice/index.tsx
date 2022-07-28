import React from 'react'
import useLazyImgs from '@/hooks/useLazyImgs'
// import download from '@/utils/download'

const Practice: React.FC = () => {
  const imgs: any[] = [
    {
      id: 1,
      src: 'https://img2.baidu.com/it/u=762599636,1175376405&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=680',
    },
    {
      id: 2,
      src: 'https://img1.baidu.com/it/u=1978711773,2720318037&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
    },
    {
      id: 3,
      src: 'https://img1.baidu.com/it/u=489774807,447371124&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=498',
    }
  ]
  // for (let i = 5; i < 30; i++) {
  //   imgs.push(
  //     {
  //       id: i,
  //       src: `https://www.maojiemao.com/public/svg/gen${i}.png`,
  //     }
  //   )
  // }

  // 图片样式
  const imgsStyle = {
    width: '100px',
    height: '100px',
    margin: '20px auto',
    display: 'block',
  }

  // 使用自定义的useImgsLazy，获取到懒加载的图片数组
  const images = useLazyImgs(imgs, imgsStyle)
  console.log('images', images)

  const handleDownload = () => {
    console.log(11)

    // imgs.forEach((item, index) => {
    //   download(item.src, `img${index}`)
    // })
  }
  handleDownload?.()


  return (
    <>
      <div>练习</div>
      <div style={{ border: '1px solid red', width: '200px', overflow: 'auto', height: '90%' }} >
        {images}
      </div>
      <button onClick={handleDownload}>下载</button>
    </>
  )
}

export default Practice