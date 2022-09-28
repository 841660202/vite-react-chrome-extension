/**
 * 更新cookie
 * @param cookie
 */
export const updateCookie = async (cookie: Cookie) => {
  await chrome.cookies.remove({
    url: cookie.domain,
    name: cookie.name,
  })
  return await chrome.cookies.set(cookie)
}
/**
 * 删除cookie
 * @param cookie
 */
export const removeCookie = async (cookie: Pick<Cookie, 'name' | 'url'>) => {
  return await chrome.cookies.remove(cookie)
}
/**
 * 获取某个k的值
 * @param cookie
 * @returns
 */
export const getCookieKeyValue = async (cookie: Pick<Cookie, 'name' | 'url'>) => {
  return await chrome.cookies.get(cookie)
}
/**
 * 获取相关域名所有k-v
 * @param cookie
 * @returns
 */
export const getAllCookies = async (cookie: Pick<Cookie, 'domain'>) => {
  return await chrome.cookies.getAll(cookie)
}
