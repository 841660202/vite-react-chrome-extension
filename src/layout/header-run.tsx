import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import React, { useState } from 'react'

import styles from './index.module.less'
interface IProps {}
const HeaderRun: React.FC<IProps> = (props) => {
  const [run, setRun] = useState(false)
  return (
    <>
      {run ? (
        <Tooltip title="停用" key={'stop'}>
          <PauseCircleOutlined onClick={() => setRun(false)} className={styles.btn} />
        </Tooltip>
      ) : (
        <Tooltip title="启用" key={'run'}>
          <PlayCircleOutlined onClick={() => setRun(true)} className={styles.btn} />
        </Tooltip>
      )}
    </>
  )
}

export default HeaderRun
