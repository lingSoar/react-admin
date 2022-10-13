/**
 * //TODO 遗留bug：
 * 1、如果菜单栏超出容器，当切换了路由时，对应高亮的菜单项不能自动滚动到可视窗口，需要手动操作
 * 2、如果跳转非菜单路由的话，菜单的高亮及展开、标签页、面包屑等都会失效
 */ 

import React, { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { Layout } from 'antd'
import { IRoute } from '@/route'
import LayoutMenu from './components/Menu'
import LayoutHeader from './components/Header'
import './index.scss'
const { Sider, Content } = Layout

// 类名基准
const baseCls = 'admin-layout'
interface ILayoutComponent {
  routes: IRoute[]
}

const LayoutComponent: React.FC<ILayoutComponent> = ({ routes }) => {
  const element = useRoutes(routes as any)
  const [collapsed, setCollapsed] = useState<boolean>(false)

  return (
    <main className={`${baseCls}`}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <LayoutMenu
          collapsed={collapsed}
          routes={routes}
          baseCls={baseCls}
        />
      </Sider>

      <Layout>
        <LayoutHeader
          baseCls={baseCls}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          routes={routes}
        />

        <Content>
          {element}
        </Content>
      </Layout>
    </main>
  )
}

export default LayoutComponent