import { Drawer, DrawerProps } from 'antd'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
interface IProps {
  ref: React.ForwardedRef<any>
}
const SiderDrawer: React.FC<IProps> = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState<DrawerProps['placement']>('left')

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }
  useImperativeHandle(
    ref,
    () => ({
      open() {
        setOpen(true)
      },
      close() {
        setOpen(false)
      },
    }),
    [],
  )

  return (
    <Drawer title={null} placement={placement} closable={false} onClose={onClose} open={open} key={placement}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  )
})

export default SiderDrawer
