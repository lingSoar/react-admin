import React from 'react'
import { useNavigate } from 'react-router-dom'

const Practice: React.FC = () => {
  const navigate = useNavigate()

  const change = () => {
    navigate('/practice/other')
  }
  return (
    <>
      <button onClick={change}>跳转</button>
      <div>练习</div>
    </>
  )
}

export default Practice