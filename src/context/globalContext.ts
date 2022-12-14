import { useEventEmitter, useMemoizedFn } from 'ahooks'
import { EventEmitter } from 'ahooks/lib/useEventEmitter'
import React, { useContext, useMemo, useState } from 'react'

interface IGlobalContext {
  lang?: string
  setLang: (v: string) => void

  domains: Domain[]
  setDomains: (v: Domain[]) => void

  currentDomain?: Domain
  setCurrentDomain: (v: Domain) => void

  pans: Pan[]
  setPans: (v: Pan[]) => void

  event$: EventEmitter<any>

  panActiveUUID: string
  setPanActiveUUID: (v: string) => void
}

export const GlobalContext = React.createContext<IGlobalContext>({} as IGlobalContext)

export const useGlobalState = () => {
  const [lang, setLang] = useState('zh')
  const [domains, setDomains] = useState<Domain[]>([] as Domain[])
  const [panActiveUUID, setPanActiveUUID] = useState('')
  const [currentDomain, setCurrentDomain] = useState<Domain>({} as Domain)
  const [pans, setPans] = useState<Pan[]>([] as Pan[])
  const event$ = useEventEmitter()
  return useMemo(() => {
    return {
      lang,
      setLang,

      domains,
      setDomains,

      currentDomain,
      setCurrentDomain,

      pans,
      setPans,

      event$,

      panActiveUUID,
      setPanActiveUUID,
    }
  }, [lang, domains, currentDomain, pans, event$, panActiveUUID])
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)!
}

export default useGlobalContext
