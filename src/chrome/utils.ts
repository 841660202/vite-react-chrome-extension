import { genUUID } from '@/utils'

/**
 * 删除无效的key
 */
export const formatCookie = (cookies: Cookie | Cookie[], deleteKeys = ['hostOnly', 'session']) => {
  if (Array.isArray(cookies)) {
    return cookies.map((item: Cookie) => {
      deleteKeys.forEach((k) => {
        delete item[k]
      })
      return item
    })
  } else {
    deleteKeys.forEach((k) => {
      delete cookies[k]
    })
    return cookies
  }
}

export const addItemsUUID = (arr: any[]) => {
  return arr?.map((item) => {
    return { ...item, uuid: genUUID() }
  })
}
