import { useMemoizedFn } from 'ahooks'
import { message } from 'antd'
import _ from 'lodash'
import React, { useContext, useEffect } from 'react'

import { getChromeCurrentCookies, getChromeCurrentTab } from '@/chrome/chrome'
import { getPanDomainsByPanId } from '@/chrome/domains'
import { getOrCreateCurrentDomainByPanId, saveCurrentDomainByPanId } from '@/chrome/pan-current-domain'
import { GlobalContext } from '@/context/globalContext'
import { genUUID } from '@/utils'

import LeftDomains from './LeftDomain'
import RightDomain from './RightDomain'

interface IProps {}
// const domains = ['www.baidu.com', 'www.baidu.cn', 'www.baidu.top']
const Home: React.FC<IProps> = () => {
  const panId = '123'
  const { setDomains, setCurrentDomain, event$ } = useContext(GlobalContext)
  // 初始化
  const handleInit = useMemoizedFn(async () => {
    const tab = await getChromeCurrentTab()
    if (tab?.url) {
      const url = new URL(tab.url)
      // 获取当前浏览器对应tab的域名
      handleGetChromeCurrentDomain({ domain: url.hostname })
    }
  })

  // 当前pan的cookie = 缓存 + 当前tab的cookie
  const handleGetChromeCurrentDomain = useMemoizedFn(async (domain) => {
    // 获取当前pan right已缓存,域名对应的cookie
    const res = await getOrCreateCurrentDomainByPanId(panId, domain)
    // 获取当前域名 chrome的cookie
    const chromeCookies = (await getChromeCurrentCookies(domain)).map((item: Cookie) => {
      return { ...item, checked: true, uuid: genUUID() }
    })
    // cookie去重
    const cookies = _.unionBy(chromeCookies as Cookie[], res.cookies || [], 'name')
    domain.cookies = cookies
    // 更新缓存, 返回为当前缓存的domain对象
    const res_save = await saveCurrentDomainByPanId(panId, domain)
    // 展示当前pan 右侧信息
    setCurrentDomain(res_save)
  })
  const handleRefresh = useMemoizedFn(() => {
    handleInit()
    handleGetPanDomainsByPanId()
  })
  event$.useSubscription((val) => {
    if (val == 'refresh') {
      message.success('刷新成功')
      handleRefresh()
    }
  })
  useEffect(() => {
    handleRefresh()
  }, [])

  // 获取左侧缓存的域名
  const handleGetPanDomainsByPanId = useMemoizedFn(async () => {
    const res = await getPanDomainsByPanId(panId)
    setDomains(res)
  })

  return (
    <div className={'custom flex-row'} style={{ overflowY: 'hidden', height: '100%' }}>
      <LeftDomains />
      <RightDomain />
    </div>
  )
}

export default Home
