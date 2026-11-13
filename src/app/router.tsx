import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { AdminPage } from '@/pages/AdminPage'
import { HomePage } from '@/pages/HomePage'
import { InvestigatorPage } from '@/pages/InvestigatorPage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { RouteErrorPage } from '@/pages/RouteErrorPage'
import { SignUpPage } from '@/pages/SignUpPage'

export const routes: RouteObject[] = [
  {
    errorElement: <RouteErrorPage />,
    children: [
      {
        path: ROUTES.home,
        element: <HomePage />,
      },
      {
        path: ROUTES.login,
        element: <LoginPage />,
      },
      {
        path: ROUTES.signup,
        element: <SignUpPage />,
      },
      {
        element: <ProtectedRoute allowedRoles={['ADMIN']} />,
        children: [
          {
            path: ROUTES.admin,
            element: <AdminPage />,
          },
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={['INVESTIGATOR']} />,
        children: [
          {
            path: ROUTES.investigator,
            element: <InvestigatorPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
