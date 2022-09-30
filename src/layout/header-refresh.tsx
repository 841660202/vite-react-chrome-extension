import { ReloadOutlined } from '@ant-design/icons'
import { useMemoizedFn } from 'ahooks'
import Tooltip from 'antd/lib/tooltip'
import React from 'react'

import useGlobalContext from '@/context/globalContext'
interface IProps {}
import styles from './index.module.less'
const HeaderRefresh: React.FC<IProps> = (props) => {
  const { event$ } = useGlobalContext()
  const handleRefresh = useMemoizedFn(() => {
    event$.emit('refresh')
  })
  return (
    <Tooltip title="刷新">
      <ReloadOutlined className={styles.btn} onClick={handleRefresh} />
    </Tooltip>
  )
}

export default HeaderRefresh
