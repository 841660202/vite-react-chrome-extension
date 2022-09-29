import localforage from 'localforage'

import { genUUID } from '@/utils'

const key_pans = 'pans_'

const key_pans_store = localforage.createInstance({
  name: 'pans',
})

/**
 * 新增/更新pan
 * @param pan
 */
export const savePan = async (pan: Pan) => {
  const pans = (await getPans()) as Pan[]
  const target = pans.find((item: Pan) => item.uuid === pan.uuid)
  let newPan
  if (target) {
    newPan = {
      ...target,
      ...pan,
    }
  } else {
    newPan = {
      ...pan,
      uuid: pan.uuid ? pan.uuid : genUUID(),
    }
  }
  return key_pans_store.setItem(key_pans + newPan.uuid, newPan)
}
/**
 * 删除pan
 * @param panId
 */
export const removePan = async (panId: string) => {
  return key_pans_store.removeItem(key_pans + panId)
}
/**
 * 查询全部的pan
 * @returns
 */
export const getPans = async () => {
  const keys = await key_pans_store.keys()
  const promises: Promise<any>[] = []
  keys.forEach(async (k) => {
    promises.push(getPanDetail(k))
  })
  return Promise.all(promises)
  // try {
  //   return (await key_pans_store.getItem(key_pans)) || []
  // } catch (error) {
  //   return []
  // }
}
/**
 * 查询pan的详情
 * @returns
 */
export const getPanDetail = (panId: string) => {
  return new Promise((resolve) => {
    key_pans_store.getItem(panId).then((res) => resolve(res))
  })
}
