import React, { ReactNode, useMemo, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { IRoute } from '@/route'
import * as Icons from '@ant-design/icons'
import storage from '@/utils/storage'
import { setTableLists } from '@/store/actions/tables'
import { getOpenKeys, handleMenuTitle, handleTabsScrollIntoView, isHasTab } from '@/components/layout/utils'
import './index.scss'

/* ILayoutMenu 组件类型 */
interface ILayoutMenu {
  baseCls: string
  routes: IRoute[]
  collapsed: boolean
}
/* 路由类型筛选 */
interface IItem {
  name: string
  path: string
  icon: ReactNode | string
}

const LayoutMenu: React.FC<ILayoutMenu> = (props) => {
  const { collapsed, routes, baseCls } = props
  const cls = `${baseCls}-LayoutMenu`

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { roles } = useSelector(store => (store as IStore)?.user)
  const { tableList } = useSelector(store => (store as IStore)?.tables)

  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])

  // 动态渲染 Icon 图标
  const customIcons: { [key: string]: any } = Icons
  const renderIcon = (name: string | ReactNode): ReactNode => typeof name === 'string' ? React.createElement(customIcons[name]) : name

  // 依据路由处理侧边的菜单栏，拥有name 的路由会被渲染
  const menu = useMemo(() => {
    const handleMenu = (routes: IRoute[]): ItemType[] => {
      const menuRoutes = routes.filter((route: IRoute) => Object.prototype.hasOwnProperty.call(route, 'name'))

      const menu: ItemType[] = menuRoutes.map((route: IRoute) => {
        const { name, path, icon } = route as IItem
        if (route?.children) {
          const childrenMenu = handleMenu(route.children)
          return { label: name, title: name, key: path, icon: renderIcon(icon), children: childrenMenu }
        }

        return { label: name, title: name, key: path, icon: renderIcon(icon) }
      })

      return menu
    }

    return handleMenu(routes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routes])

  // 路由跳转，及处理选中高亮
  const changeRoute = (menuItem: any) => {
    const { key } = menuItem
    const title = handleMenuTitle(routes, key)

    const tab = {
      title: title.at(-1) as string,
      path: key
    }

    if (!isHasTab(tableList, tab)) dispatch(setTableLists(tab))

    setSelectedKeys([key])
    storage.setStorage('selected_key', key)
    storage.setStorage('header_title', title)

    if (key) navigate(key, { replace: false })
    handleTabsScrollIntoView(key, '.tabs_item')
  }

  useEffect(() => {
    const targetKey = storage.getStorage('selected_key') || '/home'
    handleTabsScrollIntoView(targetKey, '.tabs_item')
  }, [])

  // 处理刷新展开的菜单及高亮
  useEffect(() => {
    storage.setStorage('selected_key', pathname)
    setSelectedKeys([storage.getStorage('selected_key')])
    !collapsed && setOpenKeys(getOpenKeys(pathname))
  }, [pathname, collapsed])

  useEffect(() => {
    storage.setStorage('header_title', handleMenuTitle(routes, pathname))
  }, [pathname, routes])

  // 处理展开菜单
  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys)

    const latestOpenKey = openKeys.at(-1) as string
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys)

    // 兜底处理同时展开的多个菜单，只展开一个菜单
    setOpenKeys([latestOpenKey])
  }

  return (
    <nav className={`${cls}`}>
      <div className={`${cls}-container`}>
        <div className={`${cls}-container-logo`} >
          <span>{!collapsed ? `欢迎 ${roles[0] ? roles[0] : ''} 用户` : roles[0]}</span>
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
      </div>
    </nav>
  )
}

export default LayoutMenu