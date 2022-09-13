import React, { useState, useEffect, useRef, useMemo } from 'react'
import CircularScale from '@/components/progress/circular'
import Carousel from '@/components/carousel'
import useLazyImgs from '@/hooks/useLazyImgs'
import download from '@/utils/download'
import './index.scss'

const CustomElement: React.FC = () => {
  const [schedule, setSchedule] = useState<number | string>(0)
  const [val, setVal] = useState<'top' | 'bottom' | 'left' | 'right'>('bottom')
  const [data] = useState([1])
  const carousel = useMemo(() => {
    return data.map((i, index) => (
      <div
        className='item'
        key={index}
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: `url(${require(`./images/img${index + 1}.jpg`)})`
        }}>
      </div>
    ))
  }, [data])

  const timer = useRef<any>(null)

  useEffect(() => {
    timer.current && clearTimeout(timer.current)

    timer.current = setTimeout(() => {
      schedule >= 100 ? setSchedule(0) : setSchedule(i => (Number(i) + 1).toFixed(2))
    }, 100)

    return () => {
      clearTimeout(timer.current)
    }
  }, [schedule])

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
    },
    {
      id: 11,
      src: 'https://img2.baidu.com/it/u=762599636,1175376405&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=680',
    },
    {
      id: 21,
      src: 'https://img1.baidu.com/it/u=1978711773,2720318037&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500',
    },
    {
      id: 31,
      src: 'https://img1.baidu.com/it/u=489774807,447371124&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=498',
    },
  ]

  const imgsStyle = {
    width: '100px',
    height: '100px',
    margin: '20px auto',
    display: 'block',
  }

  // 使用自定义的useImgsLazy，获取到懒加载的图片数组
  const images = useLazyImgs(imgs, imgsStyle)

  const handleDownload = () => {
    imgs.forEach((item, index) => {
      download(item.src, `下载图片${index}`)
    })
  }


  return (
    <>
      <div className='demo'>
        <h1>轮播图组件测试</h1>
        <select name='carousel' title='Carousel' value={val} onChange={(e: any) => setVal(e.target.value)}>
          <option value='top'>top</option>
          <option value='bottom'>bottom</option>
          <option value='left'>left</option>
          <option value='right'>right</option>
        </select>
        <div style={{ width: 700, height: 280, marginTop: 10 }} >
          <Carousel dotPosition={val} dotColor='red'>
            {carousel}
          </Carousel>
        </div>
      </div>

      <div className='demo'>
        <h1>进度圈组件测试</h1>
        <CircularScale
          schedule={schedule}
          // copies='80'
          size={150}
        // reticuleBgColor='#F69880'
        // maskBgColor='rgba(255, 76, 65, 0.15)'
        // stroke='rgba(255, 0, 0, 0.6)'
        // contentBgColor={{ direction: '-30deg', startColor: '#ff6699', endColor: '#ff3366' }}
        >
          <div>
            <h1>顺序刷题</h1>
            <h1 style={{ textAlign: 'center' }}>{schedule}%</h1>
          </div>
        </CircularScale>
      </div>

      <div className='demo'>
        <h1>图片懒加载测试</h1>
        <button onClick={handleDownload}>下载</button>
        <div style={{ border: '1px solid red', width: 200, height: 300, marginTop: 10, overflow: 'auto', }} >
          {images}
        </div>
      </div>
    </>
  )
}

export default CustomElement