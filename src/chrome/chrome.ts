import { formatCookie } from './utils'

const mock = true
export const getChromeCurrentTab = async () => {
  if (mock) {
    const [tab] = [
      {
        active: true,
        audible: false,
        autoDiscardable: true,
        discarded: false,
        favIconUrl: 'http://localhost:3000/src/assets/favicon.ico',
        groupId: -1,
        height: 668,
        highlighted: true,
        id: 46358328,
        incognito: false,
        index: 7,
        mutedInfo: {
          muted: false,
        },
        pinned: false,
        selected: true,
        status: 'complete',
        title: 'MHeader',
        url: 'http://localhost:3000/',
        width: 577,
        windowId: 46357036,
      },
    ]
    return tab
  } else {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    return tab
  }
}

export const getChromeCurrentCookies = async (domain: Domain) => {
  if (mock) {
    return formatCookie([
      {
        domain: 'localhost',
        expirationDate: 1697771286.460391,
        hostOnly: true,
        httpOnly: false,
        name: 'perfLang',
        path: '/',
        sameSite: 'strict',
        secure: false,
        session: false,
        storeId: '0',
        value: 'zh',
      },
    ])
  } else {
    const res = await chrome.cookies.getAll(domain)
    return formatCookie(res as Cookie[])
  }
}

export const setBadgeText = async (tab: chrome.action.BadgeTextDetails) => {
  if (mock) {
    return
  }
  return await chrome.action.setBadgeText(tab)
}
