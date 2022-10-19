import { IRoute } from '@/route'

/* tabs 标签页 */
interface ITabs {
  title: string
  path: string
}

/* 树选择的数据类型 */
export interface ITreeData {
  id: string,
  pId: number | string,
  value: string,
  title: string,
  isLeaf: boolean,
  disabled: boolean,
  item: IRoute | null,
  children?: ITreeData[]
}

/**
 * @description 处理侧边菜单的展开项
 * @param {string} path 当前的路由
 * @return string[]
 */
export const getOpenKeys = (path: string) => {
  let newStr = ''
  const newArr: string[] = []
  const arr = path.split('/').map(i => '/' + i)

  for (let i = 1; i < arr.length - 1; i++) {
    newStr += arr[i]
    newArr.push(newStr)
  }
  return newArr
}


/**
 * @description 处理菜单头部显示的面包屑标题
 * @param {IRoute[]} routes 当前用户的菜单路由
 * @param {string} key 当前高亮菜单的key 值（即路由）
 * @return string[]
 */
export const handleMenuTitle = (routes: IRoute[], key: string): string[] => {
  const res: string[] = []
  const mergeRouteName = (routes: IRoute[], key: string) => {
    return routes.reduce((pre, route) => {
      if (route?.path && key.includes(route.path) && route?.name) {
        pre.push(route?.name)
        if (route?.children) mergeRouteName(route?.children, key)
      }

      return pre
    }, res)
  }

  return mergeRouteName(routes, key)
}


/**
 * @description 处理tabs 当前高亮标签回滚到窗口
 * @param {string} key 当前的路由标识
 * @param {string} className tabs 标签页的类名，操作dom 捕获当前高亮的标签
 * @return void
 */
export const handleTabsScrollIntoView = (key: string, className: string) => {
  const tabsItems = document.querySelectorAll(className)
  const targetNode = Array.from(tabsItems).find((node: any) => node.dataset.target === key)

  if (targetNode) targetNode.scrollIntoView({ block: 'center' })
}


/**
 * @description 通过路由筛选出对应路由的信息，添加到tabs 标签页中，需要使用try catch 去捕获结果
 * @param {IRoute[]} routes 权限路由
 * @param {string} path 当前的路由
 * @return void
 */
export const filterRouteName = (routes: IRoute[], path: string) => {
  const hasNameRoutes = routes.filter(route => route.name && route.path)
  for (const route of hasNameRoutes) {
    if (route.path === path) throw ({ title: route?.name, path: route.path })

    if (route?.children && route?.children?.length > 0 && path.includes(route.path!)) {
      filterRouteName(route.children, path)
    }
  }
}


/**
 * @description 检测当前tabs 标签页中是否含有该标签
 * @param {ITable[]} tableList tabs 标签页数据
 * @param {ITabs} tab 当前检测的tab 标签
 * @return boolean
 */
export const isHasTab = (tableList: ITable[], tab: ITabs) => {
  return tableList.some(i => tab.title === i.title && tab.path === i.path)
}


/**
 * @description 处理tabs 标签页删除后的路由
 * @param {ITable[]} tables tabs 标签页数据
 * @param {string} path 当前的路由
 * @return string
 */
export const handleDeletePath = (tables: ITable[], path: string) => {
  const index = tables.findIndex(i => i?.path === path)
  const currentIndex = index === tables.length - 1 ? index - 1 : index + 1

  return tables[currentIndex]?.path
}


/**
 * @description 依旧用户权限路由，初始化树选择的数据
 * @param {IRoute[]} routes 当前用户的权限路由
 * @param {number | string} parentId 树结构中当前项的父id
 * @return ITreeData[]
 */
export const initTreeData = (routes: IRoute[], parentId: number | string = 0): ITreeData[] => {
  return routes.map(i => {
    const { path, children } = i
    return ({
      id: path!,
      pId: parentId,
      value: path!,
      title: path!,
      isLeaf: children ? false : true,
      disabled: children ? true : false,
      item: children ? i : null
    })
  })
}


/**
 * @description 处理树选择展开叶子的数据
 * @param {ITreeData[]} data 当前的树结构数据
 * @param {string} id 当前展开树的所属id
 * @param {ITreeData[]} childrenTree 需要添加到当前id 下的children 数据
 * @return ITreeData[]
 */
export const handleLoadTreeData = (data: ITreeData[], id: string, childrenTree: ITreeData[]) => {
  const deepData = [...data]
  deepData.forEach(item => {
    if (item.id === id) {
      item.children = childrenTree
    }

    if (item?.children && item.id !== id) {
      handleLoadTreeData(item.children, id, childrenTree)
    }
  })

  return deepData
}

