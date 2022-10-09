import React, { useMemo, useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import usePermission, { handleRoles } from '@/permission'
import routes from '@/routes'

import Login from '@/pages/login'
import LayoutComponent from '@/components/layout'
import storage from './utils/storage'


const App: React.FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // 为了解决返回登录页，重定向闪屏的问题（方案待优化）
  const [isShow, setIsShow] = useState<boolean>(true)
  const { user } = useSelector(store => (store as IStore)?.user)

  const asyncRoutes = usePermission()
  const userRoutes = useMemo(() => {
    try {
      handleRoles(asyncRoutes)
    } catch (err) {
      throw `路由信息配置错误, 子路由roles应该被包含于父路由roles中---roles: ${err}`
    }

    return [...routes, ...asyncRoutes]
  }, [asyncRoutes])

  useEffect(() => {
    if (user.code !== 0 && pathname !== '/login') {
      navigate('/login')
      setIsShow(false)
    }
  }, [navigate, pathname, user])

  useEffect(() => {
    if (user.code === 0 && pathname === '/login') {
      navigate('/')
      setIsShow(true)
    }
  }, [navigate, pathname, user])

  useEffect(() => {
    const path = storage.getStorage('openKeys')
    if (path) {
      navigate(path)
    } else {
      navigate('/login')
    }
  }, [navigate])

  return (
    <Routes>
      {
        isShow && <Route path='/*' element={<LayoutComponent routes={userRoutes} />} />
      }
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App