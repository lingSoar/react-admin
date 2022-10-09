import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { asyncRoutes } from '@/routes'
import { IRoute, IRouteMeta } from '@/route'

/**
 * @description 检测roles 在嵌套路由中的权限，子路由所有的role 不得超出父级所拥有的role
 * @param {IRoute[]} children 子路由
 * @param {string[]} roles 包含用户可访问的权限数组
 * @return void
 */
export const handleChildren = (children: Array<IRoute>, roles: string[]) => {
  children.forEach(childrenRoute => {
    if (childrenRoute?.children && childrenRoute?.meta?.roles) {
      handleChildren(childrenRoute.children, childrenRoute.meta.roles)
    }

    if (childrenRoute?.meta?.roles) {
      const childrenRoles = childrenRoute.meta.roles
      const res = childrenRoles.every(item => roles.includes(item))

      if (!res) throw childrenRoles
    }
  })
}

/**
 * @description 处理每一项路由嵌套的权限合理性
 * @param {IRoute[]} routes 所有的路由数据
 * @return void
 */
export const handleRoles = (routes: Array<IRoute>) => {
  routes.forEach(route => {
    if (route?.meta?.roles && route?.children) {
      const { meta: { roles }, children } = route
      handleChildren(children, roles)
    }
  })
}

/**
 * @description 过滤权限路由
 * @param {IRoute[]} asyncRoutes 所有的权限路由数据
 * @param {string[]} roles 包含用户可访问的权限数组
 * @return IRoute[]
 */
const filterAsyncRoutes = (asyncRoutes: IRoute[], roles: Array<string>) => {
  const res: Array<IRoute> = []
  asyncRoutes.forEach(item => {
    const route = { ...item }
    // 是否有权限
    if (hasPermission(route, roles)) {
      if (route?.children) {
        route.children = filterAsyncRoutes(route.children, roles)
      }
      res.push(route)
    }
  })
  return res
}

/**
 * @description 检测当前路由是否有权限
 * @param {IRoute} route 当前路由
 * @param {string[]} roles 包含用户可访问的权限数组
 * @return boolean
 */
const hasPermission = (route: IRoute, roles: Array<string>): boolean => {
  if (route?.meta && route?.meta?.roles) {
    return roles.some(item => (route.meta as IRouteMeta).roles.includes(item))
  } else {
    return true
  }
}

/**
 * @description 返回过滤筛选后的权限路由
 * @return IRoute[]
 */
const usePermission = () => {
  const { roles } = useSelector(store => (store as IStore)?.user)
  const routes: Array<IRoute> = useMemo(() => filterAsyncRoutes(asyncRoutes, roles), [roles])
  return routes
}
export default usePermission