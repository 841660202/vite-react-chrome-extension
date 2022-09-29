import { PlusCircleOutlined } from '@ant-design/icons'
import { useMemoizedFn } from 'ahooks'
import React, { useRef } from 'react'

import AddPanModal from '@/components/AddPan'
interface IProps {}
const HeaderAddPan: React.FC<IProps> = (props) => {
  const ref = useRef<IRefModal>(null)

  const handleOpen = useMemoizedFn(() => {
    ref.current?.open()
  })
  return (
    <div>
      <PlusCircleOutlined onClick={handleOpen} />
      <AddPanModal ref={ref} />
    </div>
  )
}

export default HeaderAddPan
