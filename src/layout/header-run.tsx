import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { useMemoizedFn } from 'ahooks'
import { Tooltip } from 'antd'
import React, { useState } from 'react'

import { savePanRun } from '@/chrome/pan-run'
import useGlobalContext from '@/context/globalContext'

import styles from './index.module.less'
interface IProps {}
const HeaderRun: React.FC<IProps> = (props) => {
  const { panActiveUUID } = useGlobalContext()
  const [run, setRun] = useState(false)
  const handleRun = useMemoizedFn(async (isRun) => {
    const res = await savePanRun({ uuid: panActiveUUID } as Pan, isRun)
    setRun(isRun)
  })
  return (
    <>
      {run ? (
        <Tooltip title="停用" key={'stop'}>
          <PauseCircleOutlined onClick={() => handleRun(false)} className={styles.btn} />
        </Tooltip>
      ) : (
        <Tooltip title="启用" key={'run'}>
          <PlayCircleOutlined onClick={() => handleRun(true)} className={styles.btn} />
        </Tooltip>
      )}
    </>
  )
}

export default HeaderRun
