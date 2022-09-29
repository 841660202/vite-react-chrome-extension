export const genUUID = () => {
  return `${new Date().getTime()}_byfe_${Math.floor(Math.random() * 1000)}`
}
