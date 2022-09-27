import { Button, Drawer, Space } from 'antd'
import React, { useRef, useState } from 'react'

import SiderDrawer from '@/layout/sider-drawer'
interface IProps {}
const Helper: React.FC<IProps> = (props) => {
  const ref = useRef<IRefModal>()
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <div className="page-body">
      <>
        <Space>
          <Button type="primary" onClick={showDrawer}>
            Open
          </Button>
          <Button type="primary" onClick={() => ref.current?.open()}>
            SiderDrawer
          </Button>
        </Space>
        <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </>
      <SiderDrawer ref={ref} />
    </div>
  )
}

export default Helper
