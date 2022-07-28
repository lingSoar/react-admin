import React, { useEffect, useMemo, useState } from 'react'
import './index.scss'

interface IProps {
  // 刻度份数
  copies: number
  width: number
  height: number
}

const CircularScale: React.FC<IProps> = (props) => {
  const { copies, width, height } = props
  const reticuleArr = useMemo(() => (new Array(copies)).fill(1), [copies])

  const [schedule, setSchedule] = useState<number>(0)


  useEffect(() => {
    // const allReticule = document.querySelectorAll('.reticule')
    // allReticule.forEach((item: any, index) => {
    //   item.setAttribute('style', `transform: rotate(${(index + 1) * 30})`)
    //   // item.style.transform = `rotate(${(index + 1) * 30})`
    //   // console.log(item)
    //   // console.log((item as any).dataset?.index)
    // })



  }, [])



  return (
    <>
      <div className='circularScale' style={{ width, height }}>
        <div className='content'>
          123
        </div>
        <div
          className='circularScale-maskA'
          style={{
            clip: `rect(0 ${width / 2}px ${height}px 0)`,
            transform: `rotate(${0}deg)`
          }}
        />
        <div
          className='circularScale-maskB'
          style={{
            clip: `rect(0 ${width / 2}px ${height}px 0)`,
            transform: `rotate(${180 + 360 * schedule / 100}deg)`
          }}
        />
        <ul className='circularScale-reticule'>
          {
            reticuleArr.map((_, index) => (
              <li
                key={index}
                className='reticule'
                style={{ transform: `rotate(${(index + 1) * (360 / copies)}deg)` }}
              />
            ))
          }
        </ul>
        <div className='circularScale-reticule-mask' />
      </div>

      <button onClick={() => setSchedule(i => i + 1)}>{schedule}</button>

    </>
  )
}

export default CircularScale