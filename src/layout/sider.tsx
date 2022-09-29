import { DoubleRightOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useMemoizedFn } from 'ahooks'
import { Layout, Menu } from 'antd'
import classNames from 'classnames'
import React, { useCallback, useContext, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { getPans } from '@/chrome/pans'
import NumberIcon from '@/components/NumberIcon'
import { GlobalContext } from '@/context/globalContext'

import styles from './index.module.less'
const { Sider } = Layout

interface IProps {}
const LayoutSider: React.FC<IProps> = () => {
  const navigate = useNavigate()
  const handleGo = useCallback((item: any) => {
    console.log('item.key', item.key)
    navigate(item.key)
  }, [])

  const { pans, setPans } = useContext(GlobalContext)

  const handleGetPans = useMemoizedFn(async () => {
    const res = await getPans()
    setPans(res || [])
  })

  const menuItems = useMemo(() => {
    const defaultMenus = [
      { icon: <DoubleRightOutlined />, title: '', key: '/home' },
      { icon: <QuestionCircleOutlined />, title: '', key: '/help' },
    ]

    return ([] as any).concat(defaultMenus).concat(
      pans.map((item: Pan, index) => {
        console.log(`/pan/${item.uuid}`)
        return {
          icon: <NumberIcon text={index + 1} ft_color={item.ft_color} bg_color={item.bg_color} />,
          title: item.name,
          key: `/pan/${item.uuid}`,
        }
      }),
    )
  }, [pans])

  useEffect(() => {
    handleGetPans()
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
