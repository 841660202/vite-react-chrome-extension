import { useMemoizedFn } from 'ahooks'
import classNames from 'classnames'
import _ from 'lodash'
import React, { useContext } from 'react'

import { saveCurrentDomainByPanId } from '@/chrome/pan-current-domain'
import PanEdit from '@/components/PanEdit'
import { GlobalContext } from '@/context/globalContext'
import { deepClone } from '@/utils'

import styles from './index.module.less'

interface IProps {}
// const domains = ['www.baidu.com', 'www.baidu.cn', 'www.baidu.top']
const RightDomain: React.FC<IProps> = () => {
  const panId = '123'
  const { currentDomain, setCurrentDomain, domains } = useContext(GlobalContext)
  const handleChangeRightDomain = useMemoizedFn((domain) => {
    setCurrentDomain(deepClone(domain))
    saveCurrentDomainByPanId(panId, deepClone(domain))
  })

  return (
    <div className={classNames('flex-1', styles.rightContent)}>
      <PanEdit
        envVisble
        addable
        onChange={handleChangeRightDomain}
        category={'Cookies'}
        type="cookies"
        data={currentDomain}
      />
      {/* <PanEdit category="Request Header" /> */}
      {/* <PanEdit category="Reponse Header" /> */}
    </div>
  )
}

export default RightDomain
