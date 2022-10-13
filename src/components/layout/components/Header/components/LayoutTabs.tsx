import React, { useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HomeOutlined, CloseOutlined } from '@ant-design/icons'
import storage from '@/utils/storage'
import { removeTableLists, setTableLists } from '@/store/actions/tables'
import { IRoute } from '@/route'
import { handleMenuTitle, handleTabsScrollIntoView, filterRouteName, isHasTab, handleDeletePath } from '@/components/layout/utils'

interface ILayoutTabs {
  cls: string
  routes: IRoute[]
}

const LayoutTabs: React.FC<ILayoutTabs> = (props) => {
  const { cls, routes } = props
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { tableList } = useSelector(store => (store as IStore)?.tables)
  const tabsRef = useRef<HTMLOListElement>(null)

  const changeTable = (path: string) => {
    const title = handleMenuTitle(routes, path)
    const key = tableList.length === 1 ? '/home' : path

    storage.setStorage('header_title', title)
    storage.setStorage('selected_key', key)
    handleTabsScrollIntoView(path, '.tabs_item')
    navigate(path)
  }

  const deleteTable = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, path: string) => {
    event.stopPropagation()

    const newTables: ITable[] = tableList.flatMap(i => i?.path === path ? [] : i)
    const newPath = handleDeletePath(tableList, path)
    const title = handleMenuTitle(routes, newPath)

    navigate(newPath)
    storage.setStorage('header_title', title)
    storage.setStorage('selected_key', newPath)
    dispatch(removeTableLists(newTables))
  }

  // 处理tabs 超出容器后滚动条到底
  const handleTabsScroll = () => {
    const tabsItems = document.querySelectorAll('.tabs_item')
    const allTabsWidth = Array.from(tabsItems).reduce((pre, node) => pre + node.clientWidth, 0)

    if (tabsRef.current && allTabsWidth > tabsRef.current.clientWidth) {
      tabsRef.current.scrollLeft = tabsRef.current.scrollWidth
    }
  }

  useEffect(() => {
    handleTabsScroll()
  }, [tableList])

  useEffect(() => {
    const targetKey = storage.getStorage('selected_key') || '/home'
    handleTabsScrollIntoView(targetKey, '.tabs_item')
  }, [pathname])

  // 处理手动修改路由，并且tabs 标签页中不存在当前路由对应标签时，标签不会自动添加的bug
  useEffect(() => {
    try {
      filterRouteName(routes, pathname)
    } catch (err: any) {
      const res: { path: string, title: string } = err
      if (!isHasTab(tableList, res)) dispatch(setTableLists(res))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div className={`${cls}-tabs`}>
      <ol
        className={`${cls}-tabs-content`}
        ref={tabsRef}
        id='tabs_content'
      >
        {
          tableList.map((i, index) => {
            const isActive = pathname === i.path

            return (
              <li
                className={`${cls}-tabs-content-item ${isActive ? 'header-tabs-active' : ''} tabs_item`}
                key={index}
                onClick={() => changeTable(i?.path)}
                data-target={i?.path}
              >
                {
                  i?.path === '/home'
                    ? (
                      <React.Fragment>
                        <HomeOutlined />
                        <span className='tabs_home'>首页</span>
                      </React.Fragment>
                    )
                    : (
                      <React.Fragment>
                        <span className='tabs_text'>{i?.title}</span>
                        <CloseOutlined className='tabs_icons' onClick={(e) => deleteTable(e, i?.path)} />
                      </React.Fragment>
                    )
                }
              </li>
            )
          })
        }
      </ol>
    </div>
  )
}

export default LayoutTabs