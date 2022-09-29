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
