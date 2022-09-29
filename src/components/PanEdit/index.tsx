import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import React, { useState } from 'react'

import CheckEdit from '../CheckEdit'
const defaultCheckedList = ['Apple', 'Orange']
import styles from './index.module.less'
interface IProps {
  disabled?: boolean
  category: string
  data: Domain
  type: 'cookies'
}
const PanEdit: React.FC<IProps> = (props) => {
  const { disabled, category, type, data } = props
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList)
  const [indeterminate, setIndeterminate] = useState(true)
  const [checkAll, setCheckAll] = useState(false)

  return (
    <ul className={styles.editList}>
      <p>{category}</p>
      {data?.[type]?.map((item: any) => (
        <CheckEdit key={item.name} data={item} disabled={disabled} />
      ))}
    </ul>
  )
}

export default PanEdit
