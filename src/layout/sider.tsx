import { HomeOutlined, SlackOutlined, ThunderboltFilled } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'

import NumberIcon from '@/components/NumberIcon'

import styles from './index.module.less'
const { Sider } = Layout

interface IProps {}
const LayoutSider: React.FC<IProps> = () => {
  const menuItems = [
    { icon: <HomeOutlined />, title: '', key: '/home' },
    { icon: <SlackOutlined />, title: '', key: '/help' },
  ].concat(
    Array(20)
      .fill(0)
      .map((item, index) => ({ icon: <NumberIcon text={index + 1} />, title: '', key: `/help/${index}` })),
  )
  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        paddingTop: 44,
      }}
      className={styles.sider}
      collapsed={true}
      trigger={null}
      theme={'light'}
    >
      <Menu className={styles.menu} items={menuItems} mode="inline" defaultSelectedKeys={['1']}>
        {/* <Menu.Item key="1" icon={<HomeOutlined />}>
          <NavLink to={'/home'}>Home</NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<SlackOutlined />}>
          <NavLink to={'/help'}>Home</NavLink>
        </Menu.Item>
        {Array(20)
          .fill(0)
          .map((item, index) => (
            <Menu.Item key={index + 3} icon={<NumberIcon text={`${index}`} />}></Menu.Item>
          ))}*/}
      </Menu>
    </Sider>
  )
}

export default LayoutSider
