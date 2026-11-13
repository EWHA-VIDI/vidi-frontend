import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { routes } from '@/app/router'
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary'

function Crash(): never {
  throw Object.assign(new Error('render failed'), {
    response: {
      data: { code: 'SERVER_ERROR', message: '다시 시도해 주세요.', traceId: 'trace-123' },
    },
  })
}

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => undefined)
})

afterEach(() => vi.restoreAllMocks())

it('라우트 밖 오류에서 서버 traceId를 보여준다', () => {
  render(
    <ErrorBoundary>
      <Crash />
    </ErrorBoundary>,
  )
  expect(screen.getByRole('heading', { name: '화면을 불러오지 못했습니다.' })).toBeInTheDocument()
  expect(screen.getByText('Trace ID: trace-123')).toBeInTheDocument()
})

it('라우트 렌더 오류도 공통 화면과 traceId로 보여준다', () => {
  const router = createMemoryRouter([
    { errorElement: routes[0]?.errorElement, children: [{ path: '/', element: <Crash /> }] },
  ])
  render(<RouterProvider router={router} />)
  expect(screen.getByRole('heading', { name: '화면을 불러오지 못했습니다.' })).toBeInTheDocument()
  expect(screen.getByText('Trace ID: trace-123')).toBeInTheDocument()
  expect(screen.queryByText('Unexpected Application Error!')).not.toBeInTheDocument()
})
