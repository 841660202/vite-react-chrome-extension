import { PlusCircleOutlined } from '@ant-design/icons'
import { useMemoizedFn } from 'ahooks'
import { Checkbox } from 'antd'
import React, { useEffect, useState } from 'react'

import { genUUID } from '@/utils'

import CheckEdit from '../CheckEdit'
import styles from './index.module.less'
interface IProps {
  addable?: boolean
  disabled?: boolean
  category?: string
  data?: Domain
  type: 'cookies'
  onChange?: (data: Domain) => void
  envVisble?: boolean
}
const PanEdit: React.FC<IProps> = (props) => {
  const { disabled, category, type, data, addable, envVisble } = props
  const [checkAll, setCheckAll] = useState(false)

  const handleChange = useMemoizedFn((cookie) => {
    if (data) {
      const findx = data[type]?.findIndex((item) => item.uuid === cookie.uuid)
      const _cookie = { ...data[type][findx], ...cookie }
      data[type].splice(findx, 1, _cookie)
      props.onChange?.(data)
    }
  })

  const handleChangeAll = useMemoizedFn(() => {
    const _checked = !checkAll
    setCheckAll(_checked)
    if (data) {
      data[type] = data[type]?.map((item) => {
        return {
          ...item,
          checked: _checked,
        }
      })
      props.onChange?.(data)
    }
  })

  const handleAddItem = useMemoizedFn(() => {
    const item = { name: '', value: '', uuid: genUUID(), domain: data?.domain }
    if (data) {
      data[type].push(item)
      props.onChange?.(data)
    }
  })

  const handleDelete = (item: Cookie, index: number) => {
    if (data) {
      data[type].splice(index, 1)
      props.onChange?.(data)
    }
  }

  useEffect(() => {
    if (data && type) {
      if (data[type]?.every((item) => item.checked === true)) {
        setCheckAll(true)
      } else {
        setCheckAll(false)
      }
    }
  }, [data, type])

  return (
    <ul className={styles.editList}>
      <p>
        <Checkbox checked={checkAll} onChange={handleChangeAll}>
          {category} ({data?.[type]?.length}) -{data?.domain}
        </Checkbox>
        {addable && <PlusCircleOutlined onClick={handleAddItem} />}
      </p>
      {data?.[type]?.map((item: any, index: number) => (
        <CheckEdit
          envVisble={envVisble}
          onDelete={() => handleDelete(item, index)}
          onChange={(v) => handleChange(v)}
          key={index}
          data={item}
          disabled={disabled}
        />
      ))}
    </ul>
  )
}

export default PanEdit
