import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from '@/layout'

import Helper from './Helper'
import Home from './Home'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<Home />} />
          <Route path="help" element={<Helper />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
