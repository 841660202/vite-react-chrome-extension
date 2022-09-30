const local = true

const chrome_cookies: Partial<Cookie>[] = [
  {
    domain: '.tuya.com',
    expirationDate: 3212827373,
    hostOnly: false,
    httpOnly: false,
    name: '_tpmGuid',
    path: '/',
    sameSite: 'unspecified',
    secure: false,
    session: false,
    storeId: '0',
    value: 'TY-3f0dea24ef30db9b',
  },
  {
    domain: 'sailormoon.tuya.com',
    expirationDate: 1668994029.062875,
    hostOnly: true,
    httpOnly: false,
    name: 'sc',
    path: '/',
    sameSite: 'unspecified',
    secure: false,
    session: false,
    storeId: '0',
    value: 'DmcKfH5qS3ErixjNzxbh30cbXFnUDEWi',
  },
  {
    domain: 'auth.tuya.com',
    expirationDate: 1672845121.138035,
    hostOnly: true,
    httpOnly: false,
    name: 'gt_user_id',
    path: '/',
    sameSite: 'unspecified',
    secure: false,
    session: false,
    storeId: '0',
    value: 'f1ed9810-6d3f-11ec-a102-f1225326a47d',
  },
  {
    domain: '.tuya.com',
    expirationDate: 1697090452.542878,
    hostOnly: false,
    httpOnly: false,
    name: 'gTyPlatLang',
    path: '/',
    sameSite: 'unspecified',
    secure: true,
    session: false,
    storeId: '0',
    value: 'zh',
  },
  {
    domain: 'auth.tuya.com',
    expirationDate: 1697090452.542908,
    hostOnly: true,
    httpOnly: false,
    name: 'locale',
    path: '/',
    sameSite: 'unspecified',
    secure: true,
    session: false,
    storeId: '0',
    value: 'zh',
  },
  {
    domain: '.tuya.com',
    expirationDate: 1675416204,
    hostOnly: false,
    httpOnly: false,
    name: 'notice_preferences',
    path: '/',
    sameSite: 'no_restriction',
    secure: true,
    session: false,
    storeId: '0',
    value: '2:',
  },
  {
    domain: '.tuya.com',
    expirationDate: 1675416204,
    hostOnly: false,
    httpOnly: false,
    name: 'notice_gdpr_prefs',
    path: '/',
    sameSite: 'no_restriction',
    secure: true,
    session: false,
    storeId: '0',
    value: '0,1,2:',
  },
  {
    domain: '.www.tuya.com',
    expirationDate: 253402300799,
    hostOnly: false,
    httpOnly: false,
    name: 'AGL_USER_ID',
    path: '/',
    sameSite: 'unspecified',
    secure: false,
    session: false,
    storeId: '0',
    value: 'a5c4c2fd-43b9-4d6e-995e-722ca2b6a965',
  },
  {
    domain: '.tuya.com',
    expirationDate: 1713664243,
    hostOnly: false,
    httpOnly: false,
    name: '_ga',
    path: '/',
    sameSite: 'unspecified',
    secure: false,
    session: false,
    storeId: '0',
    value: 'GA1.2.551179211.1641288920',
  },
  {
    domain: 'developer.tuya.com',
    expirationDate: 253402300799.8426,
    hostOnly: true,
    httpOnly: false,
    name: 'locale',
    path: '/',
    sameSite: 'unspecified',
    secure: true,
    session: false,
    storeId: '0',
    value: 'zh',
  },
  {
    domain: '.developer.tuya.com',
    expirationDate: 1674102365,
    hostOnly: false,
    httpOnly: false,
    name: 'Hm_lvt_5f8877e39cbc8e890abf13cf18ece1df',
    path: '/',
    sameSite: 'unspecified',
    secure: false,
    session: false,
    storeId: '0',
    value: '1642566366',
  },
  {
    domain: 'support.tuya.com',
    expirationDate: 253402300799.51733,
    hostOnly: true,
    httpOnly: false,
    name: 'locale',
    path: '/',
    sameSite: 'unspecified',
    secure: true,
    session: false,
    storeId: '0',
    value: 'zh',
  },
  {
    domain: '.support.tuya.com',
    expirationDate: 1677118426,
    hostOnly: false,
    httpOnly: false,
    name: 'Hm_lvt_a7ef2947f54a90791b2defb61a2dda98',
    path: '/',
    sameSite: 'unspecified',
    secure: false,
    session: false,
    storeId: '0',
    value: '1645582426',
  },
  {
    domain: '.tuya.com',
    expirationDate: 1666144246,
    hostOnly: false,
    httpOnly: false,
    name: '__hstc',
    path: '/',
    sameSite: 'lax',
    secure: false,
    session: false,
    storeId: '0',
    value: '122970132.ffa8c88f35a5eca7cceba57b713736da.1650592245998.1650592245998.1650592245998.1',
  },
  {
    domain: '.tuya.com',
    expirationDate: 1666144246,
    hostOnly: false,
    httpOnly: false,
    name: 'hubspotutk',
    path: '/',
    sameSite: 'lax',
    secure: false,
    session: false,
    storeId: '0',
    value: 'ffa8c88f35a5eca7cceba57b713736da',
  },
  {
    domain: 'ops.tuya.com',
    expirationDate: 253402300799.4292,
    hostOnly: true,
    httpOnly: false,
    name: 'locale',
    path: '/',
    sameSite: 'unspecified',
    secure: true,
    session: false,
    storeId: '0',
    value: 'zh',
  },
  {
    domain: 'ops.tuya.com',
    expirationDate: 2518755223,
    hostOnly: true,
    httpOnly: false,
    name: 'ops-cnregion',
    path: '/',
    sameSite: 'unspecified',
    secure: false,
    session: false,
    storeId: '0',
    value: 'CN',
  },
  {
    domain: '.tuya.com',
    expirationDate: 1694066452,
    hostOnly: false,
    httpOnly: false,
    name: 'Hm_lvt_3be32b3bb5351c17025006d025cf42e7',
    path: '/',
    sameSite: 'unspecified',
    secure: false,
    session: false,
    storeId: '0',
    value: '1662530452',
  },
  {
    domain: 'www.tuya.com',
    expirationDate: 1694066453,
    hostOnly: true,
    httpOnly: false,
    name: 'mtc_id',
    path: '/',
    sameSite: 'no_restriction',
    secure: true,
    session: false,
    storeId: '0',
    value: '3437665',
  },
  {
    domain: 'www.tuya.com',
    expirationDate: 1694066453,
    hostOnly: true,
    httpOnly: false,
    name: 'mtc_sid',
    path: '/',
    sameSite: 'no_restriction',
    secure: true,
    session: false,
    storeId: '0',
    value: '7vbjudxxc6udc77j021bsg1',
  },
  {
    domain: 'www.tuya.com',
    expirationDate: 1694066453,
    hostOnly: true,
    httpOnly: false,
    name: 'mautic_session_id',
    path: '/',
    sameSite: 'no_restriction',
    secure: true,
    session: false,
    storeId: '0',
    value: '7vbjudxxc6udc77j021bsg1',
  },
  {
    domain: 'www.tuya.com',
    expirationDate: 1694066453,
    hostOnly: true,
    httpOnly: false,
    name: 'mautic_device_id',
    path: '/',
    sameSite: 'no_restriction',
    secure: true,
    session: false,
    storeId: '0',
    value: '7vbjudxxc6udc77j021bsg1',
  },
]
/**
 * 更新cookie
 * @param cookie
 */
export const updateCookie = async (cookie: Cookie) => {
  await chrome.cookies.remove({
    url: cookie.domain,
    name: cookie.name,
  })
  return await chrome.cookies.set(cookie as chrome.cookies.SetDetails)
}
/**
 * 删除cookie
 * @param cookie
 */
export const removeCookie = async (cookie: Pick<Cookie, 'name' | 'url'>) => {
  return await chrome.cookies.remove(cookie as chrome.cookies.Details)
}
/**
 * 获取某个k的值
 * @param cookie
 * @returns
 */
export const getCookieKeyValue = async (cookie: Pick<Cookie, 'name' | 'url'>) => {
  return await chrome.cookies.get(cookie as chrome.cookies.Details)
}
/**
 * 获取相关域名所有k-v
 * @param cookie
 * @returns
 */
export const getAllCookies = async (cookie: Pick<Cookie, 'domain'>, exact = true) => {
  const cookies = local ? chrome_cookies : await chrome.cookies.getAll(cookie)
  if (exact) {
    // @ts-ignore
    return cookies.filter((_cookie: Cookie) => _cookie.domain === cookie.domain)
  }
  return cookies
}
