import React from 'react'
import loadable from '@loadable/component'
import { Navigate } from 'react-router-dom'
import {
  HomeOutlined,
  CalculatorOutlined,
  FundProjectionScreenOutlined,
  PieChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  TeamOutlined
} from '@ant-design/icons'
import { IRoute } from '@/route'

const Pie = loadable(() => import('@/pages/charts/pie'))
const Bar = loadable(() => import('@/pages/charts/bar'))
const Line = loadable(() => import('@/pages/charts/line'))
const Home = loadable(() => import('@/pages/home'))
const NotFound = loadable(() => import('@/pages/notFound'))
const Practice = loadable(() => import('@/pages/practice'))
const User = loadable(() => import('@/pages/user'))

// 权限路由
export const asyncRoutes: Array<IRoute> = [
  {
    path: '/practice',
    name: '练习',
    key: '/practice',
    icon: <CalculatorOutlined />,
    element: <Practice />,
    meta: {
      roles: ['admin', 'editor']
    },
  },
  {
    path: '/user',
    name: '用户',
    key: '/user',
    icon: <TeamOutlined />,
    element: <User />,
  },
  {
    path: '/charts',
    name: '图表展示',
    key: '/charts',
    icon: <FundProjectionScreenOutlined />,
    meta: {
      roles: ['admin', 'visitor', 'editor']
    },
    children: [
      {
        path: 'bar',
        name: '柱状图',
        key: '/charts/bar',
        icon: <BarChartOutlined />,
        element: <Bar />,
        meta: {
          roles: ['admin']
        },
      },
      {
        path: 'line',
        name: '折线图',
        key: '/charts/line',
        icon: <LineChartOutlined />,
        element: <Line />,
        meta: {
          roles: ['admin', 'editor']
        },
      },
      {
        path: 'pie',
        name: '饼图',
        key: '/charts/pie',
        icon: <PieChartOutlined />,
        element: <Pie />,
        meta: {
          roles: ['admin', 'visitor']
        },
      }
    ]
  },
]

// 白名单公共路由
const constantRoutes: IRoute[] = [
  {
    path: '/',
    element: <Navigate to='/home' />
  },
  {
    path: '/home',
    name: '首页',
    key: '/home',
    icon: <HomeOutlined />,
    element: <Home />
  },
  {
    path: '*',
    element: <NotFound />
  }
]

export default constantRoutes