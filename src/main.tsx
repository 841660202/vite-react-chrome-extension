import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createMemoryRouter, Route, RouterProvider } from 'react-router-dom'

import ErrorPage from './components/Error'
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
              path: '/home',
              element: <Home />,
            },
            {
              path: '/help',
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
