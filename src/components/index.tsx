import React from 'react'

const Demo: React.FC<any> = () => {
  console.log('子组件更新了')

  return (
    <div>React.memo 和 useMemo 的性能优化</div>
  )
}

export default React.memo(Demo)
