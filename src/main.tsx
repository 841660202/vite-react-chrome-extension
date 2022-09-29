import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createMemoryRouter, Route, RouterProvider } from 'react-router-dom'

import ErrorPage from './components/Error'
import { GlobalContext, useGlobalState } from './context/globalContext'
import Layout from './layout'
import Helper from './views/Helper'
import Home from './views/Home'

const router = createMemoryRouter(
  [
    {
      path: '/',
      errorElement: <ErrorPage />,
      element: <Layout />,
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            {
              path: 'home',
              element: <Home />,
            },
            {
              path: 'help',
              element: <Helper />,
            },
            {
              path: 'pan/:id',
              element: <Helper />,
            },
          ],
        },
      ],
    },
    // {
    //   path: "contacts/:contactId",
    //   element: <Contact />,
    // },
  ],
  {
    initialEntries: ['/', '/home'],
    initialIndex: 1,
  },
)

const BaseRoot = () => {
  const global = useGlobalState()
  return (
    <>
      <GlobalContext.Provider value={global}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BaseRoot />
  </React.StrictMode>,
)
