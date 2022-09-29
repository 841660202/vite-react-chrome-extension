import localforage from 'localforage'

const key_domains = 'domains'

const key_domains_store = localforage.createInstance({
  name: 'domains',
})

/**
 * 缓存domians
 * @param panId
 * @param domains
 */
export const postCacheDomains = (panId: string | number, domains: Domain[]) => {
  // localStorage.setItem(`${panId}_${key_domains}`, JSON.stringify(domains || []))
  return key_domains_store.setItem(`${panId}_${key_domains}`, domains)
}
/**
 * 获取domains缓存
 * @param panId
 * @param key
 * @returns
 */
export const getCacheDomains = (panId: string | number) => {
  try {
    // return JSON.parse(localStorage.getItem(`${panId}_${key_domains}`) || '') || []
    return key_domains_store.getItem(`${panId}_${key_domains}`) || []
  } catch (error) {
    return []
  }
}
