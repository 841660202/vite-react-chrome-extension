import localforage from 'localforage'

import { genUUID } from '@/utils'

const key_pans = 'pans'
const key_domains = 'domains'
const key_domains_checked = 'domains_checked'

const key_pans_store = localforage.createInstance({
  name: 'pans',
})

const key_domains_store = localforage.createInstance({
  name: 'domains',
})
const key_domains_checked_store = localforage.createInstance({
  name: 'domains_checked',
})

/**
 * 缓存domians
 * @param panId
 * @param domains
 */
export const postCacheDomains = (panId: string | number, domains: Domain[]) => {
  // localStorage.setItem(`${panId}_${key_domains}`, JSON.stringify(domains || []))
  key_pans_store.setItem(panId, domains)
}
/**
 * 获取domains缓存
 * @param panId
 * @param key
 * @returns
 */
export const getCacheDomains = (panId: string | number) => {
  try {
    return JSON.parse(localStorage.getItem(`${panId}_${key_domains}`) || '') || []
  } catch (error) {
    return []
  }
}

interface DomainCheck {
  domain: string
  checked: boolean
  cookiesChecked: string[]
}
/**
 * 缓存选中的domain 及 cookie name
 * @param panId
 * @param checkeds
 * @returns
 */
export const postHoldDomainsChecked = (panId: string | number, checkeds: DomainCheck[]) => {
  try {
    localStorage.setItem(`${panId}_${key_domains_checked}`, JSON.stringify(checkeds || []))
  } catch (error) {
    return []
  }
}

type DomainCheckFun = (key: string) => DomainCheck[]
/**
 * 获取缓存中的domain 及 cookies name
 * @param panId
 * @param checkeds
 * @returns
 */
export const getHoldDomainsChecked: DomainCheckFun = (panId: string | number) => {
  try {
    return JSON.parse(localStorage.getItem(`${panId}_${key_domains_checked}`) || '') || []
  } catch (error) {
    return []
  }
}
