import { createBrowserRouter } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { AdminPage } from '@/pages/AdminPage'
import { HomePage } from '@/pages/HomePage'
import { InvestigatorPage } from '@/pages/InvestigatorPage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { SignUpPage } from '@/pages/SignUpPage'

export const router = createBrowserRouter([
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
])
