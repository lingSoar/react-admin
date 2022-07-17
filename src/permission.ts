import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { asyncRoutes } from '@/routes'
import { IRoute } from '@/route'

function filterAsyncRoutes(asyncRoutes: IRoute[], roles: Array<string>) {
  const res: Array<IRoute> = []
  asyncRoutes.forEach(item => {
    const route = { ...item }
    // 是否有权限
    if (hasPermission(route, roles)) {
      if (route.children) {
        route.children = filterAsyncRoutes(route.children, roles)
      }
      res.push(route)
    }
  })
  return res
}

function hasPermission(route: IRoute, roles: Array<string>) {
  if (route.meta && route.meta?.roles) {
    return roles.some(item => (route.meta as any).roles.includes(item))
  } else {
    return true
  }
}

export default function usePermission() {
  const { roles } = useSelector(store => (store as any)?.user)
  const routes: Array<IRoute> = useMemo(() => filterAsyncRoutes(asyncRoutes, roles), [roles])
  return routes
}
