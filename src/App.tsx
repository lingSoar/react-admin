import React, { useMemo, useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import usePermission from '@/permission'
import routes from '@/routes'

import Login from '@/pages/login'
import LayoutComponent from '@/components/layout'
import { IRoute } from './route'

const App: React.FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  // 为了解决返回登录页，重定向闪屏的问题（方案待优化）
  const [isShow, setIsShow] = useState<boolean>(true)

  const { user } = useSelector(store => (store as IStore)?.user)

  const asyncRoutes = usePermission()
  const userRoutes = useMemo(() => {
    // 检测roles 在嵌套路由中的权限，子路由所有的role 不得超出父级所拥有的role
    const handleChildren = (children: Array<IRoute>, roles: string[]) => {
      children.forEach(childrenRoute => {
        if (childrenRoute?.children && childrenRoute?.meta?.roles) {
          handleChildren(childrenRoute.children, childrenRoute.meta.roles)
        }

        if (childrenRoute?.meta?.roles) {
          const childrenRoles = childrenRoute.meta.roles
          const res = childrenRoles.every(item => roles.includes(item))

          if (!res) throw childrenRoles
        }
      })
    }

    const handleRoles = (routes: Array<IRoute>) => {
      routes.forEach(route => {
        if (route?.meta?.roles && route?.children) {
          const { meta: { roles }, children } = route
          handleChildren(children, roles)
        }
      })
    }

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