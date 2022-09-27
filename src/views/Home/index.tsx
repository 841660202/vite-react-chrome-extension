import { MoreOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'

import { mock } from '@/mock'

import styles from './index.module.less'

interface IProps {}

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
  return <div className={'page-body'}>{hostname}</div>
}

export default Home
