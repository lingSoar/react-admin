import React, { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { Layout } from 'antd'
import './index.scss'
const { Sider, Content } = Layout
import LayoutMenu from './components/Menu'
import LayoutHeader from './components/Header'
// 类名基准
const baseCls = 'admin-layout'

const LayoutComponent: React.FC<any> = ({ routes }) => {
  const element = useRoutes(routes)
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
        />

        <Content>
          {element}
        </Content>
      </Layout>
    </main>
  )
}

export default LayoutComponent