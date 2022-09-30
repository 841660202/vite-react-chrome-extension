import { DoubleRightOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useMemoizedFn } from 'ahooks'
import { Layout, Menu } from 'antd'
import classNames from 'classnames'
import React, { useCallback, useContext, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { getPanRun, savePanRun } from '@/chrome/pan-run'
import { getPans } from '@/chrome/pans'
import NumberIcon from '@/components/NumberIcon'
import useGlobalContext, { GlobalContext } from '@/context/globalContext'

import styles from './index.module.less'
const { Sider } = Layout

interface IProps {}
const LayoutSider: React.FC<IProps> = () => {
  const navigate = useNavigate()
  const { panActiveUUID, setPanActiveUUID } = useGlobalContext()
  const handleGo = useCallback((item: any) => {
    console.log('item.key', item.key)
    navigate(item.key)
  }, [])

  const { pans, setPans } = useContext(GlobalContext)

  const handleGetPans = useMemoizedFn(async () => {
    const res = (await getPans()) || []
    setPans(res)
    handleGetPanActive(res)
  })

  const menuItems = useMemo(() => {
    const defaultMenus = [
      { icon: <DoubleRightOutlined />, title: '', key: '/home' },
      { icon: <QuestionCircleOutlined />, title: '', key: '/help' },
    ]

    return ([] as any).concat(defaultMenus).concat(
      pans.map((item: Pan, index) => {
        return {
          icon: <NumberIcon text={index + 1} ft_color={item.ft_color} bg_color={item.bg_color} />,
          title: item.name,
          key: `/pan/${item.uuid}`,
        }
      }),
    )
  }, [pans])

  const handleGetPanActive = useMemoizedFn(async (pans: Pan[]) => {
    const res = await getPanRun()
    if (res) {
      setPanActiveUUID(res)
    } else {
      // 没有激活的，默认选中第一个
      if (pans?.length > 0) {
        const uuid: string = pans[0].uuid
        setPanActiveUUID(uuid)
        savePanRun(pans[0])
      }
    }
  })

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
