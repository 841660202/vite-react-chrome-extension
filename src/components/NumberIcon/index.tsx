import React from 'react'

import styles from './index.module.less'
interface IProps {
  text: string | number
  children?: React.ReactNode
}
const NumberIcon: React.FC<IProps> = (props) => {
  return <span className={styles.number}>{props.text || props.children}</span>
}

export default NumberIcon
