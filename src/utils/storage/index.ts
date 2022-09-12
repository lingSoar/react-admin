/**
 * @description 获取localStorage
 * @param {string} key Storage名称
 * @return string
 */
 export const getLocal = (key: string) => {
	const value = window.localStorage.getItem(key)
	try {
		return JSON.parse(window.localStorage.getItem(key) as string)
	} catch (error) {
		return value
	}
}

/**
 * @description 存储localStorage
 * @param {string} key Storage名称
 * @param {any} value Storage值
 * @return void
 */
export const setLocal = (key: string, value: any) => {
	window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * @description 清除localStorage
 * @param {string} key Storage名称
 * @return void
 */
export const removeLocal = (key: string) => {
	window.localStorage.removeItem(key)
}

/**
 * @description 清除所有localStorage
 * @return void
 */
export const clearLocal = () => {
	window.localStorage.clear()
}