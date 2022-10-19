import React, { useEffect, useRef, useState, useMemo } from 'react'
import Demo from '@/components'

const Pie: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [, setIs] = useState(true)

  useEffect(() => {
    console.log('@@@---', ref)
  }, [])

  const demo = useMemo(() => {
    // 当有子组件children 的时候，使用React.memo 依旧会重渲染，所以这时候使用useMemo
    return (
      <Demo>
        <h1>{count}</h1>
      </Demo>
    )
  }, [count])
  console.log('父组件更新了---');


  return (
    <>
      <div ref={ref}>饼图</div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <button onClick={() => setIs(i => !i)}>测试无状态</button>
      {demo}
      {/* 不存在子组件children 的时候，使用React.memo 就能做到缓存效果 */}
      <Demo>
        {/* <h1>{count}</h1> */}
      </Demo>
    </>

  )
}

export default Pie