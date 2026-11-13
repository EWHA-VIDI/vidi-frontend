import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider, useLocation } from 'react-router-dom'

import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { useAuthStore } from '@/stores/authStore'

function LoginDestination() {
  const location = useLocation()
  return <p>{JSON.stringify(location.state)}</p>
}

function renderRoute() {
  const router = createMemoryRouter(
    [
      {
        path: '/admin',
        element: <ProtectedRoute allowedRoles={['ADMIN']} />,
        children: [{ index: true, element: <p>관리자 화면</p> }],
      },
      { path: '/login', element: <LoginDestination /> },
      { path: '/', element: <p>홈</p> },
    ],
    { initialEntries: ['/admin?tab=pending#latest'] },
  )
  render(<RouterProvider router={router} />)
}

beforeEach(() => useAuthStore.getState().clearSession())
afterEach(() => useAuthStore.getState().clearSession())

it('로그인 후 돌아갈 쿼리와 해시를 보존한다', async () => {
  renderRoute()
  expect(await screen.findByText('{"from":"/admin?tab=pending#latest"}')).toBeInTheDocument()
})

it('허용된 역할은 보호된 화면을 볼 수 있다', () => {
  useAuthStore.getState().setSession('test-token', 'ADMIN')
  renderRoute()
  expect(screen.getByText('관리자 화면')).toBeInTheDocument()
})

it('다른 역할은 홈으로 이동한다', async () => {
  useAuthStore.getState().setSession('test-token', 'INVESTIGATOR')
  renderRoute()
  expect(await screen.findByText('홈')).toBeInTheDocument()
})
