import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import screenfull from 'screenfull'
import { Layout, Button } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import './index.scss'
const { Header } = Layout

const LayoutHeader: React.FC<any> = (props) => {
  const { baseCls, collapsed, setCollapsed } = props
  const cls = `${baseCls}-LayoutHeader`

  const navigate = useNavigate()
  const { pathname, state } = useLocation() as { pathname: string, state: any }

  const [isFull, setIsFull] = useState<boolean>(true)
  const [title, setTitle] = useState<string>('首页')

  // 侧边菜单标题显示
  useEffect(() => {
    state?.name && setTitle(state?.name)

    switch (pathname) {
      case '/study':
        navigate('/study/cnode')
        break
      case '/charts':
        navigate('/charts/broCharts')
        break
      default:
        break
    }
  }, [navigate, pathname, state?.name])

  // 全屏操作
  const fullscreen = () => {
    if (screenfull.isEnabled) {
      isFull ? screenfull.request() : screenfull.exit()
      setIsFull(!isFull)
    }
  }
  
  return (
    <Header className={`${cls}`}>
      <div className={`${cls}-content`}>
        <div className={`${cls}-content-folaicon`}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </div>
        <h1 className={`${cls}-content-title`}>{title ? title : '访问页面不存在'}</h1>
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
  )
}

export default LayoutHeader