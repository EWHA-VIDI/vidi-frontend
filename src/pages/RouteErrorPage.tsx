import { useRouteError } from 'react-router-dom'

import { ErrorScreen } from '@/components/feedback/ErrorScreen'

export function RouteErrorPage() {
  return <ErrorScreen error={useRouteError()} />
}
