import { http, HttpResponse } from 'msw'

import { refreshAccessToken, restoreSession } from '@/api/authSession'
import { useAuthStore } from '@/stores/authStore'
import { server } from '@/test/mocks/server'

const initialState = useAuthStore.getState()

afterEach(() => useAuthStore.setState(initialState, true))

it('refresh에 성공하면 새 access token으로 세션을 저장한다', async () => {
  server.use(
    http.post('*/api/auth/refresh', () =>
      HttpResponse.json({ accessToken: 'new-token', role: 'INVESTIGATOR' }),
    ),
  )

  await expect(refreshAccessToken()).resolves.toBe('new-token')
  expect(useAuthStore.getState()).toMatchObject({
    accessToken: 'new-token',
    role: 'INVESTIGATOR',
    isInitialized: true,
  })
})

it('refresh에 실패하면 세션을 지우고 null을 돌려준다', async () => {
  useAuthStore.getState().setSession('old-token', 'ADMIN')
  server.use(http.post('*/api/auth/refresh', () => new HttpResponse(null, { status: 401 })))

  await expect(refreshAccessToken()).resolves.toBeNull()
  expect(useAuthStore.getState()).toMatchObject({ accessToken: null, isInitialized: true })
})

it('동시에 호출해도 refresh 요청은 한 번만 보낸다', async () => {
  let requestCount = 0
  server.use(
    http.post('*/api/auth/refresh', () => {
      requestCount += 1
      return HttpResponse.json({ accessToken: 'new-token', role: 'ADMIN' })
    }),
  )

  const tokens = await Promise.all([refreshAccessToken(), refreshAccessToken()])

  expect(tokens).toEqual(['new-token', 'new-token'])
  expect(requestCount).toBe(1)
})

it('세션 복구가 실패해도 복구 완료 상태가 된다', async () => {
  server.use(http.post('*/api/auth/refresh', () => new HttpResponse(null, { status: 401 })))

  await restoreSession()

  expect(useAuthStore.getState()).toMatchObject({ accessToken: null, isInitialized: true })
})
