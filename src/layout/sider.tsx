import { DoubleRightOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import classNames from 'classnames'
import React, { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import NumberIcon from '@/components/NumberIcon'
import { randomColor } from '@/utils/random'

import styles from './index.module.less'
const { Sider } = Layout

interface IProps {}
const LayoutSider: React.FC<IProps> = () => {
  const menuItems = useMemo(
    () =>
      [
        { icon: <DoubleRightOutlined />, title: '', key: '/home' },
        { icon: <QuestionCircleOutlined />, title: '', key: '/help' },
      ].concat(
        Array(20)
          .fill(0)
          .map((item, index) => ({
            icon: <NumberIcon color={randomColor()} text={index + 1} />,
            title: '',
            key: `/help/${index}`,
          })),
      ),
    [],
  )
  const navigate = useNavigate()
  const handleGo = useCallback((item: any) => {
    navigate(item.key)
  }, [])
  return (
    <Sider
      style={{
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        paddingTop: 44,
      }}
      className={classNames(styles.sider, 'custom')}
      collapsed={true}
      trigger={null}
      theme={'light'}
    >
      <Menu
        style={{ overflowY: 'auto', background: '#000', color: '#fff' }}
        onClick={handleGo}
        className={styles.menu}
        items={menuItems}
        mode="inline"
        defaultSelectedKeys={['/home']}
      ></Menu>
    </Sider>
  )
}

export default LayoutSider
