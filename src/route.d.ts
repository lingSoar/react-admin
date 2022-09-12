import { ReactNode } from 'react'

interface IRouteMeta {
  // 权限字段
  roles: Array<string>
  title?: string
  [propName: string]: any   // 接收任何多余的字段
}

interface IRoute {
  caseSensitive?: boolean;
  children?: IRoute[];
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
  // 路由名称
  name?: string;
  // icon 图标
  icon?: ReactNode | string;
  // 路由元信息
  meta?: IRouteMeta;
}

