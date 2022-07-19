import React, { useState, useMemo, useEffect } from 'react'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Layout, Menu, Button } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import useMenu from '@/hooks/useMenu'
import screenfull from 'screenfull'

import { IRoute } from '@/route'
import './layout.scss'
const { Header, Sider, Content } = Layout
// 类名基准
const baseCls = 'admin-layout'

const LayoutComponent: React.FC<any> = ({ routes }) => {
  const navigate = useNavigate()
  const element = useRoutes(routes)
  const { pathname, state } = useLocation()

  const { roles } = useSelector(store => (store as IStore)?.user)
  const [selectedKey, openKey] = useMenu(routes)

  const [title, setTitle] = useState<string>('首页')
  const [isFull, setIsFull] = useState<boolean>(true)
  const [collapsed, setCollapsed] = useState<boolean>(false);

  // 依据路由处理侧边的菜单栏
  const menu = useMemo(() => routes?.filter((item: IRoute) => Object.prototype.hasOwnProperty.call(item, 'name')).map((item: IRoute) => {
    let ele = null
    if (!item.children) {
      ele = { label: item.name, key: item.key, icon: item.icon }
    } else {
      ele = {
        label: item.name,
        key: item.key,
        icon: item.icon,
        children: item.children.map(childItem => ({ label: childItem.name, key: childItem.key, icon: childItem?.icon })),
      }
    }
    return ele
  }), [routes])

  // 路由跳转
  const changeRoute = (menuItem: any) => {
    const { domEvent: { target }, key } = menuItem
    const title = target.innerText

    if (key) {
      navigate(key, {
        replace: false,
        state: {
          name: title
        }
      })
    }
  }

  // 侧边菜单标题显示
  useEffect(() => {
    (state as any)?.name && setTitle((state as any)?.name)

    switch (pathname) {
      case '/study':
        navigate('/study/cnode')
        break;
      case '/charts':
        navigate('/charts/broCharts')
        break;
      default:
        break;
    }
    /* eslint-disable-next-line */
  }, [navigate, pathname, (state as any)?.name])

  // 全屏操作
  const fullscreen = () => {
    if (screenfull.isEnabled) {
      isFull ? screenfull.request() : screenfull.exit()
      setIsFull(!isFull)
    }
  }


  return (
    <Layout className={`${baseCls}`}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={`${baseCls}-logo`} >
          {!collapsed ? `欢迎 ${roles[0] ? roles[0] : ''} 用户` : roles[0]}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={selectedKey ? [selectedKey] : ['/home']}
          defaultOpenKeys={[openKey] as string[]}
          items={menu}
          onClick={changeRoute}
        />
      </Sider>

      <Layout className={`${baseCls}-sitelayout`}>
        <Header className={`${baseCls}-sitelayout-header`}>
          <div className={`${baseCls}-sitelayout-header-content`}>
            <div className={`${baseCls}-sitelayout-header-content-folaicon`}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })}
            </div>
            <h1 className={`${baseCls}-sitelayout-header-content-title`}>{title ? title : '访问页面不存在'}</h1>
            <Button type='primary'
              style={{
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={fullscreen}
            >网页全屏</Button>

          </div>
        </Header>

        <Content className={`${baseCls}-sitelayout-content`}>
          {element}
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutComponent