import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
const { Panel } = Collapse
import { CloseCircleOutlined, CrownOutlined, FolderOpenOutlined, FolderOutlined } from '@ant-design/icons'
import { useMemoizedFn } from 'ahooks'
import { Badge, Button, Checkbox, Collapse, Input, Space, Tooltip } from 'antd'
import classNames from 'classnames'
import _ from 'lodash'

import { getAllCookies } from '@/chrome/cookies'
import { getPanDomainsByPanId, removePanDomainById, savePanDomain } from '@/chrome/domains'
import { addItemsUUID } from '@/chrome/utils'
import PanEdit from '@/components/PanEdit'
import { GlobalContext } from '@/context/globalContext'
import { deepClone, genUUID } from '@/utils'

import EditEnvModal, { IEnv } from './Env'
import styles from './index.module.less'

interface IProps {}
const LeftDomains: React.FC<IProps> = () => {
  const [editDomain, setEditDomain] = useState<Domain>({} as Domain)
  const refEnvModal = useRef<IRefModal>(null)
  const panId = '123'
  const [inputValue, setInputValue] = useState('')
  const { domains, setDomains } = useContext(GlobalContext)
  useEffect(() => {
    handleGetPanDomainsByPanId()
  }, [])

  const handleGetDomainInfo = useMemoizedFn(async (domain: Domain) => {
    const res = await getAllCookies({ domain: domain.domain })
    const target = domains.find((item) => item.uuid === domain.uuid)
    let _domain
    if (target) {
      target.cookies = addItemsUUID(res)
      _domain = target
    } else {
      domain.cookies = addItemsUUID(res)
      _domain = domain
    }
    handleSavePanDomains(_domain)
  })

  const handleAdd = useCallback(
    (e: any) => {
      if (!inputValue) return
      const domain: Domain = { domain: inputValue, cookies: [], uuid: genUUID() }
      setDomains(([] as Domain[]).concat(domains).concat(domain))
      setInputValue('')
      handleGetDomainInfo(domain)
      e?.preventDefault()
    },
    [domains, handleGetDomainInfo, inputValue, setDomains],
  )

  const handleSavePanDomains = useMemoizedFn(async (domain) => {
    const res = await savePanDomain(panId, domain)
    console.log('res', res)
  })
  // 获取左侧缓存的域名
  const handleGetPanDomainsByPanId = useMemoizedFn(async () => {
    const res = await getPanDomainsByPanId(panId)
    setDomains(res)
  })
  const handleChangeRightDomainInput = useCallback((e: any) => {
    setInputValue(e.target.value)
  }, [])
  // 删除左侧缓存的域名
  const handleRemoveDomain = useMemoizedFn(async (domain, e) => {
    e?.stopPropagation()
    await removePanDomainById(panId, domain)
    handleGetPanDomainsByPanId()
  })

  const openKeys = useMemo(() => domains.filter((item) => item.open).map((item) => item.uuid), [domains])

  const handlePinOpen = useMemoizedFn((e, domain, bool) => {
    e?.stopPropagation()
    domain.open = bool
    setDomains(deepClone(domains))
    savePanDomain(panId, deepClone(domain))
  })

  const handleLeftDomainChange = useMemoizedFn(async (domain, index) => {
    const _domain = deepClone(domain)
    const res = await savePanDomain(panId, _domain)
    // console.log('_domain', _domain)
    domains.splice(index, 1, _domain)
    setDomains([...domains])
  })

  const handleChangeEnv = useMemoizedFn(async (env: IEnv) => {
    const _domain = deepClone({ ...editDomain, ...env })
    const res = await savePanDomain(panId, _domain)
    // 更新数据
    const findx = domains.findIndex((item) => item.uuid === editDomain.uuid)

    domains.splice(findx, 1, res as Domain)

    setDomains(deepClone(domains))
  })
  const handleEditEnv = useMemoizedFn((e, domain) => {
    e?.stopPropagation()
    setEditDomain(domain)
    refEnvModal.current?.open()
  })

  const renderEnv = (item: Domain) => {
    const child = (
      <div className="flex-row-c" style={{ paddingRight: 10 }}>
        <div style={{ height: 30 }}>
          <Space>
            {item.domain}
            <CloseCircleOutlined onClick={(e) => handleRemoveDomain(item, e)} style={{ marginLeft: 10 }} />

            {item.open ? (
              <Tooltip title="默认收起">
                <FolderOpenOutlined onClick={(e) => handlePinOpen(e, item, false)} />
              </Tooltip>
            ) : (
              <Tooltip title="默认展开">
                <FolderOutlined onClick={(e) => handlePinOpen(e, item, true)} />
              </Tooltip>
            )}
            <Tooltip title="标签">
              <CrownOutlined onClick={(e) => handleEditEnv(e, item)} />
            </Tooltip>
          </Space>
        </div>
      </div>
    )

    if (item.env) {
      return (
        <Badge.Ribbon color={item.env_color} text={item.env}>
          {child}
        </Badge.Ribbon>
      )
    }
    return child
  }

  return (
    <div className={classNames('flex-1', styles.leftContent)}>
      <div className={classNames('flex-row', styles.domainInputContent)}>
        <Input
          value={inputValue}
          onChange={handleChangeRightDomainInput}
          placeholder="新域名"
          size="small"
          onPressEnter={handleAdd}
          className={styles.domainInput}
        />
        <Button type="primary" size="small" onClick={handleAdd}>
          增加
        </Button>
      </div>
      {domains.length > 0 && (
        <div className={styles.domains}>
          <Collapse defaultActiveKey={openKeys} ghost>
            {domains.map((item, index) => (
              <Panel header={<div style={{ marginRight: 10 }}>{renderEnv(item)}</div>} key={item.uuid}>
                <PanEdit
                  onChange={(domain) => handleLeftDomainChange(domain, index)}
                  disabled
                  category={'Cookies'}
                  type="cookies"
                  data={item}
                />
              </Panel>
            ))}
          </Collapse>
        </div>
      )}
      <EditEnvModal onChange={handleChangeEnv} data={editDomain} ref={refEnvModal}></EditEnvModal>
    </div>
  )
}

export default LeftDomains
