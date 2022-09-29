import React, { useCallback, useContext, useEffect, useState } from 'react'
const { Panel } = Collapse
import { CloseCircleOutlined } from '@ant-design/icons'
import { useMemoizedFn } from 'ahooks'
import { Button, Checkbox, Collapse, Input } from 'antd'
import classNames from 'classnames'

import { getAllCookies } from '@/chrome/cookies'
import { getPans, savePan } from '@/chrome/pans'
import PanEdit from '@/components/PanEdit'
import { GlobalContext } from '@/context/globalContext'
import { mock } from '@/mock'
import { genUUID } from '@/utils'

import styles from './index.module.less'

interface IProps {}
// const domains = ['www.baidu.com', 'www.baidu.cn', 'www.baidu.top']
const Home: React.FC<IProps> = (props) => {
  const [hostname, setHostname] = useState<string>(mock.hostname)
  const [inputValue, setInputValue] = useState('')
  const { domains, setDomains } = useContext(GlobalContext)
  const handleInit = useCallback(async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (tab?.url) {
      try {
        const url = new URL(tab.url)
        setHostname(url.hostname)
      } catch {}
    }
  }, [])

  useEffect(() => {
    handleInit()
  }, [])

  const handleGetDomainInfo = useMemoizedFn(async (domain: Domain) => {
    const res = await getAllCookies({ domain: domain.domain })
    const target = domains.find((item) => item.uuid === domain.uuid)
    if (target) {
      target.cookies = res
    } else {
      domain.cookies = res
      domains.push(domain)
    }
    setDomains(domains)
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

  const handleChangeInput = useCallback((e: any) => {
    setInputValue(e.target.value)
  }, [])
  return (
    <div className={'custom flex-row'} style={{ overflowY: 'hidden', height: '100%' }}>
      <div className={classNames('flex-1', styles.leftContent)}>
        <div className={classNames('flex-row', styles.domainInputContent)}>
          <Input
            value={inputValue}
            onChange={handleChangeInput}
            placeholder="新域名"
            size="small"
            onPressEnter={handleAdd}
            className={styles.domainInput}
          />
          <Button type="primary" size="small" onClick={handleAdd}>
            增加
          </Button>
        </div>
        <div className={styles.domains}>
          <Collapse defaultActiveKey={['1']} ghost>
            {domains.map((item) => (
              <Panel
                header={
                  <div className="flex-row-c" style={{ paddingRight: 10 }}>
                    <Checkbox>{item.domain}</Checkbox>

                    <CloseCircleOutlined style={{ marginLeft: 10 }} />
                  </div>
                }
                key={item.uuid}
              >
                <PanEdit disabled category={'Cookies'} type="cookies" data={item} />
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
      <div className={classNames('flex-1', styles.rightContent)}>
        {/* <PanEdit category="Cookies" data={undefined} /> */}
        {/* <PanEdit category="Request Header" /> */}
        {/* <PanEdit category="Reponse Header" /> */}
      </div>
    </div>
  )
}

export default Home
