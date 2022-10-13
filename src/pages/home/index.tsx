import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, message } from 'antd'
import { removeUserInf, changeUserInf } from '@/store/actions/user'
import { clearTableLists } from '@/store/actions/tables'
import usePermission from '@/hooks/usePermission'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = (user: string) => {
    dispatch(removeUserInf('userInf'))
    dispatch(changeUserInf(user))
    dispatch(clearTableLists())

    message.info('用户信息改变，重新登陆')
    setTimeout(() => {
      navigate('/login', { replace: true })
    }, 10)
  }

  const adminElement = usePermission(['admin'], () => {
    return (
      <Button
        type='primary'
        onClick={() => console.log('你好')}
      >你好</Button>
    )
  }, false)

  const editorElement = usePermission(['editor'], () => {
    return (
      <span style={{ color: 'red' }}>美丽的祖国</span>
    )
  })

  const visitorElement = usePermission(['visitor'], () => {
    return (
      <span style={{ color: 'blue' }}>敲代码的小凌</span>
    )
  })

  return (
    <Fragment>
      <h1>首页</h1>
      <div>
        <h1>切换用户</h1>
        <Button type='primary' danger onClick={() => handleLogin('admin')}>admin</Button>&nbsp;
        <Button type='primary' danger onClick={() => handleLogin('editor')}>editor</Button>&nbsp;
        <Button type='primary' danger onClick={() => handleLogin('visitor')}>visitor</Button>
      </div>

      <div>
        <h1>元素级的权限按钮测试：</h1>
        admin: {adminElement}
        <hr />
        visitor: {visitorElement}
        <hr />
        editor: {editorElement}
      </div>
    </Fragment>
  )
}

export default Home