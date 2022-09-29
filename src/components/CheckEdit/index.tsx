import { CloseCircleOutlined } from '@ant-design/icons'
import { Checkbox, Input, Space } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import React, { useEffect, useState } from 'react'
const CheckboxGroup = Checkbox.Group
import styles from './index.module.less'
interface IProps {
  disabled?: boolean
  data: any
}
const CheckEdit: React.FC<IProps> = (props) => {
  const { data, disabled } = props
  const [item, setItem] = useState<CellEdit>({} as CellEdit)

  useEffect(() => {
    setItem(data || {})
  }, [data])

  return (
    <li className={styles.editItem} key={item.name}>
      <Checkbox className={styles.checkbox} />
      <Input disabled={disabled} value={item.name} className={styles.input} size="small" placeholder="key" />
      <Input disabled={disabled} value={item.value} className={styles.input} size="small" placeholder="value" />
      {!disabled && <CloseCircleOutlined />}
    </li>
  )
}

export default CheckEdit
