import React, { useRef, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

// 元素级别的权限控制
export default function usePermission(roles: Array<string> = [], element: () => React.ReactNode, isShow: boolean = true,) {
  const containerRef = useRef(null)
  const { roles: userRole } = useSelector(store => (store as any)?.user)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPermission])

  if (isShow) {
    return isPermission ? element() : null
  } else {
    return isPermission ? element() : <span ref={containerRef}> {element()} </span>
  }
}