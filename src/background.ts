const color = '#3aa757'
console.log('1212', 1212)
// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ color })
//   console.log('Default background color set to %cgreen', `color: ${color}`)
// })

console.log('chrome', chrome)
// chrome.runtime.onInstalled.addListener(function () {
//   chrome.contextMenus.create({
//     id: 'sampleContextMenu',
//     title: 'Sample Context Menu',
//     contexts: ['selection'],
//   })
// })
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'sampleContextMenu',
    title: '这是我的右键菜单',
    contexts: ['all'],
  })
})

// chrome.runtime.onInstalled.addListener( ()=> {
//   chrome.contextMenus.create({
//     id: 'sampleContextMenu',
//     title: 'Sample Context Menu',
//     contexts: ['selection'],
//   })
// })

// // This will run when a bookmark is created.
// chrome.bookmarks.onCreated.addListener(() => {
//   // do something
// })

// chrome.runtime.onSuspend.addListener(() => {
//   console.log('Unloading.')
//   chrome.browserAction.setBadgeText({ text: '121' })
// })
