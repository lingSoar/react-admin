import AdminConfig from '@/config'

/**
 * @description storage 类
 * @param {string} type 本地存储的类型
 * @class Storage
 */
export class Storage {
	private storage: globalThis.Storage

	constructor(type: 'localStorage' | 'sessionStorage' = 'localStorage') {
		this.storage = type === 'localStorage' ? window.localStorage : window.sessionStorage
	}

	/**
	 * @description 存储值
	 * @param {string} key 存储的键名
	 * @param {any} value 存储的键值
	 * @return void
	 */
	setStorage(key: string, value: any) {
		this.storage.setItem(key, JSON.stringify(value))
	}

	/**
	 * @description 获取值
	 * @param {string} key 指定的键名
	 * @return any
	 */
	getStorage(key: string) {
		const value = this.storage.getItem(key)
		try {
			return JSON.parse(this.storage.getItem(key) as string)
		} catch (error) {
			return value
		}
	}

	/**
	 * @description 清除指定的存储
	 * @param {string} key 指定的键名
	 * @return void
	 */
	removeStorage(key: string) {
		this.storage.removeItem(key)
	}

	/**
	 * @description 清空所有的存储
	 * @return void
	 */
	clearStorage() {
		this.storage.clear()
	}
}


/**
 * @description cookie 类
 * @param {string} prefixKey 前缀key 值
 * @class Cookie
 */
export class Cookie {
	private prefixKey?: string
	private getKey: (key: string) => string

	constructor(prefixKey = 'Admin') {
		this.prefixKey = prefixKey
		this.getKey = (key: string) => `${this.prefixKey}_${key}`.toUpperCase()
	}

	/**
	 * @description 设置cookie
	 * @param {string} name cookie 的名称
	 * @param {any} value cookie 的值
	 * @param {number=} expire 过期时间
	 * @example 如果过期时间为设置，默认关闭浏览器自动删除
	 */
	setCookie(name: string, value: any, expire: number | null = AdminConfig.DEFAULT_CACHE_TIME) {
		const cookieValue = JSON.stringify(value)
		document.cookie = `${this.getKey(name)}=${cookieValue}; Max-Age=${expire}`
	}

	/**
	 * @description 根据名字获取cookie值
	 * @param {string} name cookie 的名称
	 */
	getCookie(name: string): string {
		const cookieArr = document.cookie.split('; ')
		for (let i = 0, length = cookieArr.length; i < length; i++) {
			const values = cookieArr[i].split('=')
			if (values[0] === this.getKey(name)) {
				try {
					return JSON.parse(values[1])
				} catch (err) {
					return values[1]
				}
			}
		}

		return ''
	}

	/**
	 * @description 根据名字删除指定的cookie
	 * @param {string} key 指定的cookie
	 */
	removeCookie(key: string) {
		this.setCookie(key, 1, -1)
	}

	/**
	 * @description 清空cookie，使所有cookie失效，设置expires 为过期的时间即可
	 */
	clearCookie(): void {
		const keys = document.cookie.match(/[^ =;]+(?==)/g)
		const expirationTime = new Date(0).toUTCString()
		if (keys) {
			for (const key of keys) {
				document.cookie = `${key}=''; expires=${expirationTime}`
			}
		}
	}
}


export default new Storage('localStorage')
