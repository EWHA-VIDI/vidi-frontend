import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'
import { useAuthStore } from '@/stores/authStore'
import type { UserRole } from '@/types/auth'

type ProtectedRouteProps = {
  allowedRoles: UserRole[]
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const location = useLocation()
  const accessToken = useAuthStore((state) => state.accessToken)
  const role = useAuthStore((state) => state.role)

  if (!accessToken || !role) {
    return (
      <Navigate
        to={ROUTES.login}
        replace
        state={{ from: `${location.pathname}${location.search}${location.hash}` }}
      />
    )
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to={ROUTES.home} replace />
  }

  return <Outlet />
}
