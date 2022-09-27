import { CloseCircleOutlined } from '@ant-design/icons'
import { Checkbox, Input, Space } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import React, { useState } from 'react'
const CheckboxGroup = Checkbox.Group
const plainOptions = ['Apple', 'Pear', 'Orange']
const defaultCheckedList = ['Apple', 'Orange']
import styles from './index.module.less'
interface IProps {
  disabled?: boolean
}
const CheckEdit: React.FC<IProps> = (props) => {
  const { disabled } = props
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList)
  const [indeterminate, setIndeterminate] = useState(true)
  const [checkAll, setCheckAll] = useState(false)

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list)
    setIndeterminate(!!list.length && list.length < plainOptions.length)
    setCheckAll(list.length === plainOptions.length)
  }

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
  }
  return (
    <ul className={styles.editList}>
      <p>Request Header</p>
      <li className={styles.editItem}>
        <Checkbox className={styles.checkbox} />
        <Input disabled={disabled} className={styles.input} size="small" placeholder="key" />
        <Input disabled={disabled} className={styles.input} size="small" placeholder="value" />
        {!disabled && <CloseCircleOutlined />}
      </li>
      <li className={styles.editItem}>
        <Checkbox className={styles.checkbox} />
        <Input disabled={disabled} className={styles.input} size="small" placeholder="key" />
        <Input disabled={disabled} className={styles.input} size="small" placeholder="value" />
        {!disabled && <CloseCircleOutlined />}
      </li>
      <li className={styles.editItem}>
        <Checkbox className={styles.checkbox} />
        <Input disabled={disabled} className={styles.input} size="small" placeholder="key" />
        <Input disabled={disabled} className={styles.input} size="small" placeholder="value" />
        {!disabled && <CloseCircleOutlined />}
      </li>
    </ul>
  )
}

export default CheckEdit
