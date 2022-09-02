import React, { useState, useEffect, useRef, useMemo } from 'react'
import CircularScale from '@/components/progress/circular'
import Carousel from '@/components/carousel'
import './index.scss'

const User: React.FC = () => {
  const [schedule, setSchedule] = useState<number | string>(0)
  const timer = useRef<any>(null)

  const [data] = useState([1, 2, 3, 4, 5, 6, 7])
  const [num, setNum] = useState(700)

  useEffect(() => {
    timer.current && clearTimeout(timer.current)

    timer.current = setTimeout(() => {
      schedule >= 100 ? setSchedule(0) : setSchedule(i => (Number(i) + 1).toFixed(2))
    }, 100)

    return () => {
      clearTimeout(timer.current)
    }
  }, [schedule])

  const add = () => {
    schedule >= 100 && setSchedule(0)
    setSchedule(i => (Number(i) + 1).toFixed(2))
  }

  const [val, setVal] = useState<'top' | 'bottom' | 'left' | 'right'>('bottom')

  const handleChange = (e: any) => {
    setVal(e.target.value)
  }

  const carousel = useMemo(() => {
    return data.map((i, index) => (
      <div
        className='item'
        key={index}
        style={{
          width: 700,
          height: 280,
          backgroundImage: `url(${require(`./images/img${index + 1}.jpg`)})`
        }}>
      </div>
    ))
  }, [data])


  return (
    <>
      <input title='a' value={num} onChange={(e) => setNum(Number(e.target.value))} />

      <select name='a' title='b' value={val} onChange={handleChange}>
        <option value="top">top</option>
        <option value="bottom">bottom</option>
        <option value="left">left</option>
        <option value="right">right</option>
      </select>
      {val}

      <div style={{ width: 700, height: 280 }} >
        <Carousel dotPosition={val}>
          {carousel}
        </Carousel>
      </div>
      <div>User</div>
      <CircularScale
        schedule={schedule}
      // copies='70'
      // size={150}
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
      <button onClick={add}>{schedule}</button>
    </>
  )
}

export default User