import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'
import { useAuthStore } from '@/stores/authStore'
import type { UserRole } from '@/types/auth'

type ProtectedRouteProps = {
  allowedRoles: UserRole[]
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const location = useLocation()
  const { accessToken, role } = useAuthStore()

  if (!accessToken || !role) {
    return <Navigate to={ROUTES.login} replace state={{ from: location.pathname }} />
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to={ROUTES.home} replace />
  }

  return <Outlet />
}
