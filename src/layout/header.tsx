import { MenuUnfoldOutlined, ReloadOutlined } from '@ant-design/icons'
import { Avatar, Layout, Space, Tooltip } from 'antd'
import React, { useRef } from 'react'

import HeaderAddType from './header-add'
import HeaderAddPan from './header-addpan'
import HeaderMore from './header-more'
import HeaderRun from './header-run'
import styles from './index.module.less'
import SiderDrawer from './sider-drawer'
const { Header } = Layout

interface IProps {}
const LayoutHeader: React.FC<IProps> = () => {
  const refSiderDrawer = useRef<IRefModal>()

  return (
    <>
      <Header className={styles.header}>
        <MenuUnfoldOutlined onClick={() => refSiderDrawer.current?.open()} style={{ marginRight: 16, marginLeft: 8 }} />
        <Avatar className={styles.avatar} src="http://t-blog-images.aijs.top/img/avatar.jpeg" />
        <HeaderAddPan />
        <div className={styles.headerLeft}>{'hostname'}</div>
        <div className={styles.headerRight}>
          <Space>
            <Tooltip title="刷新">
              <ReloadOutlined className={styles.btn} />
            </Tooltip>
            <HeaderAddType />
            <HeaderRun />
            <HeaderMore />
          </Space>
        </div>
      </Header>
      <SiderDrawer ref={refSiderDrawer} />
    </>
  )
}

export default LayoutHeader
