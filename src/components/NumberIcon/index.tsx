import React from 'react'

import styles from './index.module.less'
interface IProps {
  text: string | number
  children?: React.ReactNode
  ft_color?: string
  bg_color?: string
}
const NumberIcon: React.FC<IProps> = (props) => {
  const { ft_color, bg_color } = props
  return (
    <span className={styles.number} style={{ background: bg_color, color: ft_color }}>
      {props.text || props.children}
    </span>
  )
}

export default NumberIcon
