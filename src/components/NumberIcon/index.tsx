import React from 'react'

import styles from './index.module.less'
interface IProps {
  text: string | number
  children?: React.ReactNode
  color?: string
}
const NumberIcon: React.FC<IProps> = (props) => {
  const { color } = props
  return (
    <span className={styles.number} style={{ background: color }}>
      {props.text || props.children}
    </span>
  )
}

export default NumberIcon
