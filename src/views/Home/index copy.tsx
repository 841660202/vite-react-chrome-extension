import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
const { Panel } = Collapse
import { CloseCircleOutlined, FolderOpenOutlined, FolderOutlined } from '@ant-design/icons'
import { useMemoizedFn } from 'ahooks'
import { Button, Checkbox, Collapse, Input, Space, Tooltip } from 'antd'
import classNames from 'classnames'
import _ from 'lodash'

import { getChromeCurrentCookies, getChromeCurrentTab } from '@/chrome/chrome'
import { getAllCookies } from '@/chrome/cookies'
import { getPanDomainsByPanId, removePanDomainById, savePanDomain } from '@/chrome/domains'
import { getOrCreateCurrentDomainByPanId, saveCurrentDomainByPanId } from '@/chrome/pan-current-domain'
import { getPans, savePan } from '@/chrome/pans'
import PanEdit from '@/components/PanEdit'
import { GlobalContext } from '@/context/globalContext'
import { mock } from '@/mock'
import { deepClone, genUUID } from '@/utils'

import styles from './index.module.less'

interface IProps {}
// const domains = ['www.baidu.com', 'www.baidu.cn', 'www.baidu.top']
const Home: React.FC<IProps> = (props) => {
  const panId = '123'
  const [hostname, setHostname] = useState<string>(mock.hostname)
  const [inputValue, setInputValue] = useState('')
  const { domains, setDomains, currentDomain, setCurrentDomain } = useContext(GlobalContext)
  // 初始化
  const handleInit = useMemoizedFn(async () => {
    const tab = await getChromeCurrentTab()
    if (tab?.url) {
      const url = new URL(tab.url)
      // 获取当前浏览器对应tab的域名
      handleGetChromeCurrentDomain({ domain: url.hostname })
      setHostname(url.hostname)
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

  useEffect(() => {
    handleInit()
    handleGetPanDomainsByPanId()
  }, [])

  const handleGetDomainInfo = useMemoizedFn(async (domain: Domain) => {
    const res = await getAllCookies({ domain: domain.domain })
    const target = domains.find((item) => item.uuid === domain.uuid)
    let _domain
    if (target) {
      target.cookies = res
      _domain = target
    } else {
      domain.cookies = res
      _domain = domain
      // domains.push(domain)
    }
    handleSavePanDomains(_domain)
    // setDomains(domains)
  })

  const handleAdd = useCallback(
    (e: any) => {
      if (!inputValue) return
      const domain: Domain = { domain: inputValue, cookies: [], uuid: genUUID() }
      setDomains(([] as Domain[]).concat(domains).concat(domain))
      setInputValue('')
      handleGetDomainInfo(domain)
      // message.success('success')
      e?.preventDefault()
    },
    [domains, handleGetDomainInfo, inputValue, setDomains],
  )

  const handleSavePanDomains = useMemoizedFn(async (domain) => {
    console.log('domain', domain)
    const res = await savePanDomain(panId, domain)
    console.log('res', res)
  })
  // 获取左侧缓存的域名
  const handleGetPanDomainsByPanId = useMemoizedFn(async () => {
    const res = await getPanDomainsByPanId(panId)
    setDomains(res)
  })
  const handleChangeRightDomainInput = useCallback((e: any) => {
    setInputValue(e.target.value)
  }, [])
  // 删除左侧缓存的域名
  const handleRemoveDomain = useMemoizedFn(async (domain, e) => {
    e?.stopPropagation()
    await removePanDomainById(panId, domain)
    handleGetPanDomainsByPanId()
  })
  const handleChangeRightDomain = useMemoizedFn((domain) => {
    setCurrentDomain(deepClone(domain))
    saveCurrentDomainByPanId(panId, deepClone(domain))
  })

  const openKeys = useMemo(() => domains.filter((item) => item.open).map((item) => item.uuid), [domains])

  const handlePinOpen = useMemoizedFn((e, domain, bool) => {
    e?.stopPropagation()
    domain.open = bool
    setDomains(deepClone(domains))
    savePanDomain(panId, deepClone(domain))
  })
  const handleChangeRightDomainCollapse = useMemoizedFn((v) => {
    console.log('v', v)
  })

  const handleLeftDomainChange = useMemoizedFn((v) => {
    console.log('v', v)
  })
  return (
    <div className={'custom flex-row'} style={{ overflowY: 'hidden', height: '100%' }}>
      <div className={classNames('flex-1', styles.leftContent)}>
        <div className={classNames('flex-row', styles.domainInputContent)}>
          <Input
            value={inputValue}
            onChange={handleChangeRightDomainInput}
            placeholder="新域名"
            size="small"
            onPressEnter={handleAdd}
            className={styles.domainInput}
          />
          <Button type="primary" size="small" onClick={handleAdd}>
            增加
          </Button>
        </div>
        {domains.length > 0 && (
          <div className={styles.domains}>
            <Collapse defaultActiveKey={openKeys} ghost onChange={handleChangeRightDomainCollapse}>
              {domains.map((item) => (
                <Panel
                  header={
                    <div className="flex-row-c" style={{ paddingRight: 10 }}>
                      <Space>
                        <Checkbox>{item.domain}</Checkbox>

                        <CloseCircleOutlined onClick={(e) => handleRemoveDomain(item, e)} style={{ marginLeft: 10 }} />

                        {item.open ? (
                          <Tooltip title="默认收起">
                            <FolderOpenOutlined onClick={(e) => handlePinOpen(e, item, false)} />
                          </Tooltip>
                        ) : (
                          <Tooltip title="默认展开">
                            <FolderOutlined onClick={(e) => handlePinOpen(e, item, true)} />
                          </Tooltip>
                        )}
                      </Space>
                    </div>
                  }
                  key={item.uuid}
                >
                  <PanEdit onChange={handleLeftDomainChange} disabled category={'Cookies'} type="cookies" data={item} />
                </Panel>
              ))}
            </Collapse>
          </div>
        )}
      </div>
      <div className={classNames('flex-1', styles.rightContent)}>
        <PanEdit onChange={handleChangeRightDomain} category={'Cookies'} type="cookies" data={currentDomain} />
        {/* <PanEdit category="Request Header" /> */}
        {/* <PanEdit category="Reponse Header" /> */}
      </div>
    </div>
  )
}

export default Home
