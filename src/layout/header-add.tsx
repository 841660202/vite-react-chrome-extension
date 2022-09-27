import { PlusCircleOutlined } from '@ant-design/icons'
import { Dropdown, Menu, message } from 'antd'
import React, { useCallback } from 'react'

import styles from './index.module.less'
interface IProps {}
const menus = [
  {
    label: 'Request Header',
    key: 'Request-Header',
  },
  {
    label: 'Response Header',
    key: 'Response-Header',
  },
  {
    label: 'Cookie Request',
    key: 'Cookie-Request',
  },
  {
    label: 'Set Cookie Response',
    key: 'Set-Cookie-Response',
  },
]
const HeaderAddType: React.FC<IProps> = (props) => {
  const menu = <Menu items={menus} />
  const handleAdd = useCallback((e: any) => {
    e?.preventDefault()
  }, [])

  return (
    <Dropdown overlay={menu}>
      <a title="新增" style={{ color: '#fff' }} onClick={handleAdd}>
        <PlusCircleOutlined className={styles.btn} />
      </a>
    </Dropdown>
  )
}

export default HeaderAddType
