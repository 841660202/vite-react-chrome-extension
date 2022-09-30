import localforage from 'localforage'

import { genUUID } from '@/utils'

const key_pan_current_domain_store = localforage.createInstance({
  name: 'pan_current_domain',
})

export const getOrCreateCurrentDomainByPanId = async (panId: string, currentDomain: Domain) => {
  const res = await key_pan_current_domain_store.getItem(panId)
  if (res) {
    return await saveCurrentDomainByPanId(panId, { ...res, ...currentDomain })
  } else {
    return await saveCurrentDomainByPanId(panId, currentDomain)
  }
}

export const saveCurrentDomainByPanId = (panId: string, currentDomain: Domain) => {
  return key_pan_current_domain_store.setItem(panId, currentDomain)
}

export const removeCurrentDomainByPanId = (panId: string) => {
  return key_pan_current_domain_store.removeItem(panId)
}
