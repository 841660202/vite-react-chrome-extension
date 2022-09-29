import './index.css'

import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createMemoryRouter, Route, RouterProvider } from 'react-router-dom'

import PageLoad from './components/LoadPage'
import { GlobalContext, useGlobalState } from './context/globalContext'

const ErrorPage = lazy(() => import('./components/Error'))
const Layout = lazy(() => import('./layout'))
const Helper = lazy(() => import('./views/Helper'))
const Home = lazy(() => import('./views/Home'))

const router = createMemoryRouter(
  [
    {
      path: '/',
      errorElement: <ErrorPage />,
      element: (
        <Suspense fallback={<PageLoad />}>
          <Layout />
        </Suspense>
      ),
      children: [
        {
          errorElement: (
            <Suspense fallback={<PageLoad />}>
              <ErrorPage />
            </Suspense>
          ),
          children: [
            {
              path: 'home',
              element: (
                <Suspense fallback={<PageLoad />}>
                  <Home />
                </Suspense>
              ),
            },
            {
              path: 'help',
              element: (
                <Suspense fallback={<PageLoad />}>
                  <Helper />
                </Suspense>
              ),
            },
            {
              path: 'pan/:id',
              element: (
                <Suspense fallback={<PageLoad />}>
                  <Helper />
                </Suspense>
              ),
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
