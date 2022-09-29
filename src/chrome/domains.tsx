import localforage from 'localforage'

import { genUUID } from '@/utils'

const key_domains_store = localforage.createInstance({
  name: 'domains',
})

/**
 * 缓存domain
 * @param panId
 * @param domain
 * @returns
 */
export const savePanDomain = async (panId: string | number, domain: Domain) => {
  const key = `${panId}_${domain.uuid}`
  let find = await key_domains_store.getItem(key)
  if (find) {
    find = {
      ...find,
      ...domain,
    }
  } else {
    find = {
      ...domain,
      uuid: domain.uuid ?? genUUID(),
    }
  }
  return key_domains_store.setItem(key, find)
}
/**
 * 根据panId 获取domains
 * @param panId
 * @returns
 */
export const getPanDomains = async (panId: string | number) => {
  const keys = await key_domains_store.keys()
  const promises: Promise<any>[] = []
  keys
    .filter((item) => {
      return item.split('_')[0] === panId
    })
    .forEach(async (k) => {
      promises.push(key_domains_store.getItem(k))
    })
  return Promise.all(promises)
}
/**
 * 根据panId删除domains
 * @param panId
 * @returns
 */
export const removeDomainsByPanId = async (panId: string | number) => {
  const keys = await key_domains_store.keys()
  const promises: Promise<any>[] = []
  keys
    .filter((item) => {
      return item.split('_')[0] === panId
    })
    .forEach(async (k) => {
      promises.push(key_domains_store.removeItem(k))
    })
  return Promise.all(promises)
}
/**
 * 根据 panId 和 domain.uuid删除一条记录
 * @param panId
 * @param domain
 * @returns
 */
export const removePanDomainById = (panId: string | number, domain: Domain) => {
  return key_domains_store.removeItem(`${panId}_${domain.uuid}`) || []
}

export const getPanDomainsByPanId = async (panId: string | number) => {
  const keys = await key_domains_store.keys()
  const promises: Promise<any>[] = []
  keys
    .filter((item) => {
      return item.split('_')[0] === panId
    })
    .forEach(async (k) => {
      promises.push(key_domains_store.getItem(k))
    })
  return Promise.all(promises)
}
