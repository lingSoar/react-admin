import React, { useRef, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'

type TUsePermission = (roles: string[], element: () => React.ReactNode, isShow?: boolean) => React.ReactNode | null

/**
 * @description 元素级别的权限控制
 * @param {string[]} roles 可访问的角色权限数组
 * @param {() => React.ReactNode} element 渲染元素的回调函数
 * @param {boolean} isDisable 对于按钮是否采用禁止点击/不显示
 * @return React.ReactNode | null
 */
const usePermission: TUsePermission = (roles = [], element, isDisable = true) => {
  const containerRef = useRef(null)
  const { roles: userRole } = useSelector(store => (store as IStore)?.user)
  const isPermission = useMemo(() => userRole.some((role: string) => roles.includes(role)), [roles, userRole])

  // 操作dom，进行控制
  const unDisable = () => {
    const buttonRef = (containerRef.current as any)?.children[0]

    // 禁止点击
    if (!isPermission && buttonRef) {
      buttonRef.disabled = true
      buttonRef.style.cursor = 'not-allowed'
    }
  }

  useEffect(() => {
    unDisable()
    /* eslint-disable-next-line */
  }, [isPermission])

  if (isDisable) {
    return isPermission ? element() : null
  } else {
    return isPermission ? element() : <span ref={containerRef}> {element()} </span>
  }
}

export default usePermission