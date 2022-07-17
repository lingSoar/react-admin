import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { IRoute } from '@/route'

export default function useMenu(routes: IRoute[]) {
  const { pathname } = useLocation()
  // 处理刷新后，侧边菜单的展开和高亮
  const keys = useMemo(() => {
    const selectedItem = routes.find(item => pathname.includes(item.key as string))
    let keyArr = [selectedItem?.key, '']

    if (selectedItem) {
      if (selectedItem.children) {
        const selectedChildItem = selectedItem.children.find(childItem => pathname.includes(childItem.key as string))
        keyArr = [selectedChildItem?.key, selectedItem.key]
      }
    }
    return keyArr
  }, [pathname, routes])

  return keys
}