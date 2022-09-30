import { MenuUnfoldOutlined } from '@ant-design/icons'
import { Avatar, Layout, Space } from 'antd'
import React, { useRef } from 'react'

import useGlobalContext from '@/context/globalContext'

import HeaderAddType from './header-add'
import HeaderAddPan from './header-addpan'
import HeaderMore from './header-more'
import HeaderRefresh from './header-refresh'
import HeaderRun from './header-run'
import styles from './index.module.less'
import SiderDrawer from './sider-drawer'
const { Header } = Layout

interface IProps {}
const LayoutHeader: React.FC<IProps> = () => {
  const refSiderDrawer = useRef<IRefModal>()
  const { currentDomain } = useGlobalContext()

  return (
    <>
      <Header className={styles.header}>
        <MenuUnfoldOutlined onClick={() => refSiderDrawer.current?.open()} style={{ marginRight: 16, marginLeft: 8 }} />
        <Avatar className={styles.avatar} src="http://t-blog-images.aijs.top/img/avatar.jpeg" />
        <HeaderAddPan />
        <div className={styles.headerLeft}>{currentDomain?.domain}</div>
        <div className={styles.headerRight}>
          <Space>
            <HeaderRefresh />
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
