import React, { useState, } from 'react'
import screenfull from 'screenfull'
import { Layout, Button } from 'antd'
import { IRoute } from '@/route'
import BreadcrumbNav from './components/BreadcrumbNav'
import LayoutTabs from './components/LayoutTabs'
import './index.scss'

const { Header } = Layout
interface ILayoutHeader {
  baseCls: string
  collapsed: boolean
  routes: IRoute[]
  setCollapsed: (collapsed: boolean) => void
}

const LayoutHeader: React.FC<ILayoutHeader> = (props) => {
  const { baseCls } = props
  const cls = `${baseCls}-LayoutHeader`

  const [isFull, setIsFull] = useState<boolean>(true)

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
        <BreadcrumbNav
          cls={cls}
          {...props}
        />

        <Button type='primary'
          style={{
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 100

          }}
          onClick={fullscreen}
        >网页全屏</Button>
      </div>
      
      <LayoutTabs
        cls={cls}
        {...props}
      />
    </Header>
  )
}

export default LayoutHeader