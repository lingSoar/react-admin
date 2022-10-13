import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import storage from '@/utils/storage'

interface IBreadcrumbNav {
  cls: string,
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const BreadcrumbNav: React.FC<IBreadcrumbNav> = (props) => {
  const { cls, collapsed, setCollapsed } = props
  const header_title = storage.getStorage('header_title')

  const navigate = useNavigate()
  const { pathname } = useLocation() as { pathname: string, state: any }
  const [title, setTitle] = useState<string[]>(header_title ?? ['首页'])

  useEffect(() => {
    setTitle(storage.getStorage('header_title'))
  }, [pathname])

  useEffect(() => {
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
  }, [navigate, pathname])

  const backToHome = () => {
    navigate('/')
    storage.setStorage('selected_key', '/home')
    storage.setStorage('header_title', ['首页'])
  }

  return (
    <section className={`${cls}-content-left`}>
      <div className={`${cls}-content-left-folaicon`}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => setCollapsed(!collapsed),
        })}
      </div>

      <ol className={`${cls}-content-left-title`}>
        <li className={`${cls}-content-left-title-item`}>
          <span
            onClick={backToHome}
            className={`${cls}-content-left-title-item-text ${title.includes('首页') ? 'header_title-highlight' : ''}`}
          >首页</span>
        </li>
        {
          title.map((i, index) => {
            if (i === '首页') return null
            const length = title.length - 1

            return (
              <li key={index} className={`${cls}-content-left-title-item`}>
                <span className={`${cls}-content-left-title-item-decollator`}>/</span>
                <span className={`${cls}-content-left-title-item-text ${index === length ? 'header_title-highlight' : ''}`}>{i}</span>
              </li>
            )
          })
        }
      </ol>
    </section>
  )
}

export default BreadcrumbNav