import React, { useMemo, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import usePermission from '@/permission'
import routes from '@/routes'

import Login from '@/pages/login'
import LayoutComponent from '@/components/layout'

const App: React.FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { user } = useSelector(store => (store as any)?.user)
  
  const asyncRoutes = usePermission()
  const userRoutes = useMemo(() => ([...routes, ...asyncRoutes]), [asyncRoutes])

  useEffect(() => {
    if (Object.keys(user).length === 0 && pathname !== '/login') {
      navigate('/login')
    }
  }, [navigate, pathname, user])

  useEffect(() => {
    if (user.code === 0 && pathname === '/login') {
      navigate('/')
    }
  }, [navigate, pathname, user])

  return (
    <Routes>
      <Route path='/*' element={<LayoutComponent routes={userRoutes} />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App