import { useMemoizedFn } from 'ahooks'
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
}

export const GlobalContext = React.createContext<IGlobalContext>({} as IGlobalContext)

export const useGlobalState = () => {
  const [lang, setLang] = useState('zh')
  const [domains, setDomains] = useState<Domain[]>([] as Domain[])
  const [currentDomain, setCurrentDomain] = useState<Domain>({} as Domain)
  const [pans, setPans] = useState<Pan[]>([] as Pan[])

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
    }
  }, [lang, domains, currentDomain, pans])
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)!
}

export default useGlobalContext
