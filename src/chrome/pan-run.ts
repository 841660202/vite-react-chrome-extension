import localforage from 'localforage'

const key_pans_run_store = localforage.createInstance({
  name: 'pans-run',
})
/**
 * 更新运行的pan
 * @param pan
 * @param isRun
 * @returns
 */
export const savePanRun = async (pan: Pick<Pan, 'uuid'>, isRun = false) => {
  return key_pans_run_store.setItem(pan.uuid, isRun)
}

/**
 * 获取运行的 pan
 * @param pan
 * @param isRun
 * @returns
 */
export const getPanRun = async () => {
  const res = await key_pans_run_store.keys()

  if (res.length > 0) {
    return res[0]
  } else {
    return null
  }
}
