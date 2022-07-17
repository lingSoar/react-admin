import React from 'react'
import loadable from '@loadable/component'
import { Navigate } from 'react-router-dom'
import {
  BankTwoTone,
  HighlightTwoTone,
  EyeTwoTone,
  PieChartFilled,
  FundFilled,
  SlidersFilled,
} from '@ant-design/icons'

import { IRoute } from '@/route'

// /**
//  * @React 中路由的格式定义
//   interface RouteObject {
//     caseSensitive?: boolean;
//     children?: RouteObject[];
//     element?: React.ReactNode;
//     index?: boolean;
//     path?: string;
//   }
//  */
// interface IRoute extends RouteObject {
//   // 路由名称
//   name?: string,
//   // 路由key 名
//   key?: string,
//   // icon 图标
//   icon?: React.ReactNode,
//   // 路由元信息
//   meta?: IRouteMeta,
//   // 子路由
//   children?: IRoute[]
// }

// interface IRouteMeta {
//   // 权限字段
//   roles: Array<string>
//   [propName: string]: any   // 接收任何多余的字段
// }


const Pie = loadable(() => import('@/pages/charts/pie'))
const Bar = loadable(() => import('@/pages/charts/bar'))
const Line = loadable(() => import('@/pages/charts/line'))
const Home = loadable(() => import('@/pages/home'))
const NotFound = loadable(() => import('@/pages/notFound'))
const Login = loadable(() => import('@/pages/login'))
const Practice = loadable(() => import('@/pages/practice'))


// 权限路由
export const asyncRoutes: Array<IRoute> = [
  {
    path: '/practice',
    name: '练习',
    key: '/practice',
    icon: <HighlightTwoTone />,
    element: <Practice />,
    meta: {
      roles: ['admin', 'editor']
    },
  },
  {
    path: '/charts',
    name: '图表展示',
    key: '/charts',
    icon: <EyeTwoTone />,
    meta: {
      roles: ['admin', 'visitor', 'editor']
    },
    children: [
      {
        path: 'bar',
        name: '柱状图',
        key: '/charts/bar',
        icon: <FundFilled />,
        element: <Bar />,
        meta: {
          roles: ['admin']
        },
      },
      {
        path: 'line',
        name: '折线图',
        key: '/charts/line',
        icon: <SlidersFilled />,
        element: <Line />,
        meta: {
          roles: ['admin', 'editor']
        },
      },
      {
        path: 'pie',
        name: '饼图',
        key: '/charts/pie',
        icon: <PieChartFilled />,
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
    icon: <BankTwoTone />,
    element: <Home />
  },
  {
    path: '*',
    element: <NotFound />
  }
]

export default constantRoutes