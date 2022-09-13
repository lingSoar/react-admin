import React, { ReactNode, useMemo, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { IRoute } from '@/route'
import * as Icons from '@ant-design/icons'
import { setLocal, getLocal } from '@/utils/storage'
import './index.scss'

interface IItem {
  name: string
  path: string
  icon: ReactNode | string
}

const LayoutMenu: React.FC<any> = (props) => {
  const { collapsed, routes, baseCls } = props
  const cls = `${baseCls}-LayoutMenu`

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { roles } = useSelector(store => (store as IStore)?.user)

  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])

  // 动态渲染 Icon 图标
  const customIcons: { [key: string]: any } = Icons
  const renderIcon = (name: string | ReactNode): ReactNode => {
    if (typeof name === 'string') {
      return React.createElement(customIcons[name])
    }
    return name
  }

  // 依据路由处理侧边的菜单栏，拥有name 的路由会被渲染
  const menu = useMemo(() => {
    const handleMenu = (routes: IRoute[]): ItemType[] => {
      const menuRoutes = routes.filter((route: IRoute) => Object.prototype.hasOwnProperty.call(route, 'name'))

      const menu: ItemType[] = menuRoutes.map((route: IRoute) => {
        const { name, path, icon } = route as IItem
        if (route?.children) {
          const childrenMenu = handleMenu(route.children)
          return { label: name, key: path, icon: renderIcon(icon), children: childrenMenu }
        }
        return { label: name, key: path, icon: renderIcon(icon) }
      })

      return menu
    }

    return handleMenu(routes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routes])

  // 路由跳转，及处理选中高亮
  const changeRoute = (menuItem: any) => {
    const { domEvent: { target }, key } = menuItem
    const title = target.innerText
    setSelectedKeys([key])
    setLocal('openKeys', key)

    if (key) {
      navigate(key, {
        replace: false,
        state: {
          name: title
        }
      })
    }
  }

  // 处理刷新展开的菜单
  useEffect(() => {
    const getOpenKeys = (path: string) => {
      let newStr = ''
      const newArr: string[] = []
      const arr = path.split('/').map(i => '/' + i)

      for (let i = 1; i < arr.length - 1; i++) {
        newStr += arr[i]
        newArr.push(newStr)
      }
      return newArr
    }

    setSelectedKeys([getLocal('openKeys')])
    !collapsed && setOpenKeys(getOpenKeys(pathname))
  }, [pathname, collapsed])

  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) {
      return setOpenKeys(openKeys)
    }

    const latestOpenKey = openKeys.at(-1) as string
    if (latestOpenKey.includes(openKeys[0])) {
      return setOpenKeys(openKeys)
    }

    setOpenKeys([latestOpenKey])
  }

  return (
    <React.Fragment>
      <div className={`${cls}-logo`} >
        {!collapsed ? `欢迎 ${roles[0] ? roles[0] : ''} 用户` : roles[0]}
      </div>
      <Menu
        theme='dark'
        mode='inline'
        triggerSubMenuAction='click'
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        items={menu}
        onClick={changeRoute}
        onOpenChange={onOpenChange}
      />
    </React.Fragment>
  )
}

export default LayoutMenu