import { useMemoizedFn } from 'ahooks'
import { Dropdown } from 'antd'
import React, { useEffect, useState } from 'react'
import { SketchPicker } from 'react-color'

import styles from './index.module.less'
interface IProps {
  value?: string
  onChange?: (v: string) => void
}

const ColorPicker: React.FC<IProps> = (props) => {
  const { value } = props
  const [visible, setVisible] = useState(false)
  const [color, setColor] = useState<string>()
  const handleChange = useMemoizedFn(({ rgb }) => {
    const rgba = `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`
    setColor(rgba)
    props.onChange?.(rgba)
  })

  useEffect(() => {
    setColor(value)
  }, [value])
  return (
    <>
      <Dropdown overlay={<SketchPicker color={color} onChangeComplete={handleChange}></SketchPicker>}>
        <div className={styles.rect} style={{ background: color }} onClick={() => setVisible(!visible)} />
      </Dropdown>
    </>
  )
}

export default ColorPicker
