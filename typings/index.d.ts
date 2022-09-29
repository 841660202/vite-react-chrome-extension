declare module '*.scss' {
  const classes: { [key: string]: string }
  export default classes
}
declare module '*.less' {
  const classes: { [key: string]: string }
  export default classes
}

declare interface IRefModal {
  open: () => void
  close: () => void
}

declare interface Cookie {
  domain: string
  url: string
  expirationDate: number
  httpOnly: boolean
  hostOnly?: boolean
  session?: boolean
  name: string
  path: string
  sameSite: 'unspecified' | 'no_restriction' | 'lax' | 'strict'
  secure: boolean
  storeId: string
  value: string
  checked?: boolean
}

declare interface Domain {
  domain: string
  cookies: []
  checked?: boolean
  uuid: string
  tag?: 'day' | 'test' | 'pre' | 'pro'
}

declare interface Pan {
  uuid: string
  name: string
  bg_color?: string
  ft_color?: string
  checked?: boolean
}

declare interface CellEdit {
  name: string
  value: string
}
