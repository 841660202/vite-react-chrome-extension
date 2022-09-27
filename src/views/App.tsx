import { HomeOutlined, SlackOutlined, ThunderboltFilled } from '@ant-design/icons'
import { Menu } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'
import { BrowserRouter, HashRouter as Router, Navigate, NavLink, Route, Routes } from 'react-router-dom'

import Layout from '@/layout'

import Helper from './Helper'
import Home from './Home'
import styles from './index.module.less'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="help" element={<Helper />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
