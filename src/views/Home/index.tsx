import React, { useCallback, useEffect, useState } from 'react'
const { Panel } = Collapse
import { CloseCircleOutlined, DisconnectOutlined, LinkOutlined } from '@ant-design/icons'
import { Button, Checkbox, Collapse, Input, message } from 'antd'
import classNames from 'classnames'

import CheckEdit from '@/components/CheckEdit'
import { mock } from '@/mock'

import styles from './index.module.less'

interface IProps {}
const domains = ['www.baidu.com', 'www.baidu.cn', 'www.baidu.top']
const Home: React.FC<IProps> = (props) => {
  const [hostname, setHostname] = useState<string>(mock.hostname)

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
  const handleAdd = useCallback((e: any) => {
    message.success('success')
    e?.preventDefault()
  }, [])
  return (
    <div className={'custom flex-row'} style={{ overflowY: 'hidden', height: '100%' }}>
      <div className={classNames('flex-1', styles.leftContent)}>
        <div className={classNames('flex-row', styles.domainInputContent)}>
          <Input placeholder="选取新域名" size="small" className={styles.domainInput} />
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
                    <Checkbox>{item}</Checkbox>

                    <CloseCircleOutlined style={{ marginLeft: 10 }} />
                  </div>
                }
                key={item}
              >
                <CheckEdit disabled />
                <CheckEdit disabled />
                <CheckEdit disabled />
                <CheckEdit disabled />
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
      <div className={classNames('flex-1', styles.rightContent)}>
        <CheckEdit />
        <CheckEdit />
        <CheckEdit />
        <CheckEdit />
      </div>
    </div>
  )
}

export default Home
