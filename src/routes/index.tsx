/**
 * 路由配置中存在name 的，且当前登录用户拥有访问权限的，才会被渲染到菜单栏
 * 路由配置meta 中的roles 表示该路由可访问的用户，其子路由中设置的权限用户不得超出父级所配置的权限用户
 */
import React from 'react'
import { Navigate } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'
import lazyLoad from '@/routes/utils'
import { IRoute } from '@/route'

const Pie = lazyLoad(React.lazy(() => import('@/pages/charts/pie')))
const Bar = lazyLoad(React.lazy(() => import('@/pages/charts/bar')))
const Line = lazyLoad(React.lazy(() => import('@/pages/charts/line')))
const Home = lazyLoad(React.lazy(() => import('@/pages/home')))
const NotFound = lazyLoad(React.lazy(() => import('@/pages/notFound')))
const Practice = lazyLoad(React.lazy(() => import('@/pages/practice')))
const User = lazyLoad(React.lazy(() => import('@/pages/user')))
const CustomElement = lazyLoad(React.lazy(() => import('@/pages/custom')))
const Other = lazyLoad(React.lazy(() => import('@/pages/other')))

// 权限路由
export const asyncRoutes: Array<IRoute> = [
  {
    path: '/practice',
    name: '练习',
    icon: 'CalculatorOutlined',
    element: Practice,
    meta: {
      roles: ['admin', 'editor'],
    },
  },
  {
    path: '/charts/line/a/other',
    element: Other,
    meta: {
      roles: ['admin', 'editor'],
    },
  },
  {
    path: '/practice/other',
    element: Other,
    meta: {
      roles: ['admin'],
    },
  },
  {
    path: '/user',
    name: '用户',
    icon: 'TeamOutlined',
    element: User,
  },
  {
    path: '/component',
    name: '自定义组件',
    icon: 'LaptopOutlined',
    element: CustomElement,
  },
  {
    path: '/charts',
    name: '图表展示',
    icon: 'FundProjectionScreenOutlined',
    meta: {
      roles: ['admin', 'visitor']
    },
    children: [
      {
        path: '/charts/bar',
        name: '柱状图',
        icon: 'BarChartOutlined',
        element: Bar,
        meta: {
          roles: ['admin']
        },
      },
      {
        path: '/charts/line',
        name: '折线图',
        icon: 'LineChartOutlined',
        meta: {
          roles: ['admin']
        },
        children: [
          {
            path: '/charts/line/a',
            name: '柱状图',
            icon: 'BarChartOutlined',
            element: Line,
            meta: {
              roles: ['admin']
            },
          },
        ]
      },
      {
        path: '/charts/pie',
        name: '饼图',
        icon: 'PieChartOutlined',
        element: Pie,
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
    icon: <HomeOutlined />,
    element: Home
  },
  {
    path: '*',
    element: NotFound
  }
]

export default constantRoutes