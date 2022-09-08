// eslint-disable-next-line import/named
import { RouteObject } from 'react-router-dom'
/**
 * @React 中路由的格式定义
  interface RouteObject {
    caseSensitive?: boolean;
    children?: RouteObject[];
    element?: React.ReactNode;
    index?: boolean;
    path?: string;
  }
 */

interface IRoute extends RouteObject {
  // 路由名称
  name?: string,
  // icon 图标
  icon?: React.ReactNode,
  // 路由元信息
  meta?: IRouteMeta,
  // 子路由
  children?: IRoute[]
}

interface IRouteMeta {
  // 权限字段
  roles: Array<string>
  [propName: string]: any   // 接收任何多余的字段
}
