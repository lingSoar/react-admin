import React, { useState, useEffect, useRef } from 'react'
import CircularScale from '@/components/circular-scale'
const User: React.FC = () => {
  const [schedule, setSchedule] = useState<number | string>(0)
  const timer = useRef<any>(null)


  useEffect(() => {
    timer.current && clearTimeout(timer.current)

    timer.current = setTimeout(() => {
      schedule >= 100 ? setSchedule(0) : setSchedule(i => (Number(i) + .3).toFixed(2))
    }, 100)

    return () => {
      clearTimeout(timer.current)
    }
  }, [schedule])

  const add = () => {
    schedule >= 100 && setSchedule(0)
    setSchedule(i => (Number(i) + .3).toFixed(2))
  }

  return (
    <>
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