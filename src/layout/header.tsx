import {
  MoreOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  PlusCircleOutlined,
  SmileOutlined,
} from '@ant-design/icons'
import { Avatar, Dropdown, Layout, Menu, Space, Tooltip } from 'antd'
import React from 'react'

import styles from './index.module.less'
const { Header } = Layout

interface IProps {}
const LayoutHeader: React.FC<IProps> = () => {
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item (disabled)
            </a>
          ),
          icon: <SmileOutlined />,
          disabled: true,
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              3rd menu item (disabled)
            </a>
          ),
          disabled: true,
        },
        {
          key: '4',
          danger: true,
          label: 'a danger item',
        },
      ]}
    />
  )
  return (
    <Header className={styles.header}>
      <Avatar className={styles.avatar} src="https://joeschmoe.io/api/v1/random" />
      <div className={styles.headerLeft}>{'hostname'}</div>
      <div className={styles.headerRight}>
        <Space>
          <Tooltip title="新增">
            <PlusCircleOutlined className={styles.btn} />
          </Tooltip>
          <Tooltip title="停用">
            <PauseCircleOutlined className={styles.btn} />
          </Tooltip>
          <Tooltip title="启用">
            <PlayCircleOutlined className={styles.btn} />
          </Tooltip>
          <Dropdown overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>
              <Tooltip title="更多">
                <MoreOutlined />
              </Tooltip>
            </a>
          </Dropdown>
        </Space>
      </div>
    </Header>
  )
}

export default LayoutHeader
