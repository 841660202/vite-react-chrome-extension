import { CloseCircleOutlined, CopyOutlined } from '@ant-design/icons'
import { useMemoizedFn } from 'ahooks'
import { Badge, Checkbox, Input, message, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import styles from './index.module.less'
interface IProps {
  disabled?: boolean
  data: any
  onChange: (v: any) => void
  onDelete: () => void
  envVisble?: boolean
}
const CheckEdit: React.FC<IProps> = (props) => {
  const { data, disabled, envVisble } = props
  const [item, setItem] = useState<CellEdit>({} as CellEdit)

  useEffect(() => {
    setItem(data || {})
  }, [data])

  const handleChangeValue = useMemoizedFn((e, type) => {
    const _item: any = { ...item }
    if (type === 'checked') {
      _item.checked = !item.checked
      setItem(_item)
      props.onChange?.(_item)
      return
    } else {
      const { value } = e.target

      if (value.includes(':')) {
        const values = value.split(':')
        _item['name'] = values[0]
        _item['value'] = values[1]
        setItem(_item)
        props.onChange?.(_item)
        return
      }
      _item[type] = value
      setItem(_item)
      props.onChange?.(_item)
    }
  })

  return (
    <div>
      <li className={styles.editItem}>
        {envVisble && <div className="dot-rect">day</div>}

        <Checkbox
          key="check"
          checked={item.checked}
          onChange={(e) => handleChangeValue(e, 'checked')}
          className={styles.checkbox}
        />
        <Input
          onChange={(e) => handleChangeValue(e, 'name')}
          disabled={disabled}
          value={item.name}
          className={styles.input}
          size="small"
          placeholder="Key 支持拆分"
          key="name"
        />
        <Input
          onChange={(e) => handleChangeValue(e, 'value')}
          disabled={disabled}
          value={item.value}
          className={styles.input}
          size="small"
          placeholder="value"
          key="value"
        />
        <Space>
          {!disabled && <CloseCircleOutlined onClick={props.onDelete} />}
          <CopyToClipboard text={` ${item.name}:${item.value}`} onCopy={() => message.success('copy success')}>
            <CopyOutlined />
          </CopyToClipboard>
        </Space>
      </li>
    </div>
  )
}

export default CheckEdit
