import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

import LayoutHeader from './header'
import LayoutSider from './sider'
const { Content } = Layout

interface LayoutProps {
  children?: React.ReactNode
}

export default (props: LayoutProps) => {
  return (
    <Layout hasSider style={{ height: 500 }}>
      <LayoutSider />
      <Layout style={{ backgroundColor: '#fff', overflowY: 'hidden' }}>
        <LayoutHeader />
        <Content style={{ paddingLeft: 40, paddingTop: 44, overflowY: 'hidden' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
