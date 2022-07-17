// 存储用户信息
export function setUserInf(data: any) {
  localStorage.setItem('userInf', JSON.stringify(data))
}

// 获取用户信息
export function getUserInf(key: string) {
  return JSON.parse(localStorage.getItem(key) as string)
}

// 删除用户信息
export function removeUserInf(key: string) {
  localStorage.removeItem(key)
}