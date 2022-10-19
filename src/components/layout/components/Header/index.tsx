import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import screenfull from 'screenfull'
import { Layout } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons'
import { IRoute } from '@/route'
import BreadcrumbNav from './components/BreadcrumbNav'
import LayoutTabs from './components/LayoutTabs'
import UserAvatar from './components/UserAvatar'
import './index.scss'

const IconFont = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/c/font_2966178_dgewt8fwk7n.js'],
})

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
  const { roles } = useSelector(store => (store as IStore)?.user)
  const [isFull, setIsFull] = useState<boolean>(true)

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

        <div className={`${cls}-content-right`}>
          <div className={`${cls}-content-right-icon`}>
            <span className={`${cls}-content-right-icon-item`}>
              <IconFont
                type={`${isFull ? 'icon-quanping_o' : 'icon-quxiaoquanping_o'}`}
                onClick={fullscreen}
                style={{ fontSize: 30 }}
              />
            </span>

            <span className={`${cls}-content-right-icon-item`}>{roles[0]}</span>
          </div>

          <UserAvatar cls={`${cls}-content-right`} user={roles} {...props} />
        </div>
      </div>

      <LayoutTabs cls={cls} {...props} />
    </Header>
  )
}

export default LayoutHeader