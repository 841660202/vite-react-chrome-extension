import localforage from 'localforage'

export const key_domains_checked = 'domains_checked'

const key_domains_checked_store = localforage.createInstance({
  name: 'domains_checked',
})

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
    // localStorage.setItem(`${panId}_${key_domains_checked}`, JSON.stringify(checkeds || []))
    return key_domains_checked_store.setItem(`${panId}_${key_domains_checked}`, checkeds)
  } catch (error) {
    return []
  }
}

type DomainCheckFun = (key: string) => Promise<DomainCheck[]>
/**
 * 获取缓存中的domain 及 cookies name
 * @param panId
 * @param checkeds
 * @returns
 */
export const getHoldDomainsChecked: DomainCheckFun = async (panId: string | number) => {
  try {
    // return JSON.parse(localStorage.getItem(`${panId}_${key_domains_checked}`) || '') || []
    return (
      (await key_domains_checked_store.getItem(localStorage.getItem(`${panId}_${key_domains_checked}`) || '')) || []
    )
  } catch (error) {
    return []
  }
}
