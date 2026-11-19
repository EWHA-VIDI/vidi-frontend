import axios from 'axios'
import { http, HttpResponse } from 'msw'

import { setupAuthInterceptors } from '@/api/authInterceptors'
import { useAuthStore } from '@/stores/authStore'
import { server } from '@/test/mocks/server'

const initialState = useAuthStore.getState()

function createClient() {
  const instance = axios.create({ baseURL: '/api' })
  setupAuthInterceptors(instance)
  return instance
}

function echoAuthorization() {
  server.use(
    http.get('*/api/me', ({ request }) =>
      HttpResponse.json({ authorization: request.headers.get('Authorization') }),
    ),
  )
}

afterEach(() => useAuthStore.setState(initialState, true))

it('access token이 있으면 Authorization 헤더에 붙인다', async () => {
  useAuthStore.getState().setSession('access-token', 'ADMIN')
  echoAuthorization()

  const { data } = await createClient().get('/me')

  expect(data).toEqual({ authorization: 'Bearer access-token' })
})

it('access token이 없으면 Authorization 헤더를 붙이지 않는다', async () => {
  echoAuthorization()

  const { data } = await createClient().get('/me')

  expect(data).toEqual({ authorization: null })
})

// 새 토큰이 붙은 요청만 성공시키는 API
function protectedApi() {
  server.use(
    http.get('*/api/me', ({ request }) =>
      request.headers.get('Authorization') === 'Bearer new-token'
        ? HttpResponse.json({ ok: true })
        : new HttpResponse(null, { status: 401 }),
    ),
  )
}

function refreshApi(response: () => Response) {
  const counter = { count: 0 }
  server.use(
    http.post('*/api/auth/refresh', () => {
      counter.count += 1
      return response()
    }),
  )
  return counter
}

it('401이면 refresh 후 원래 요청을 다시 보낸다', async () => {
  useAuthStore.getState().setSession('expired-token', 'ADMIN')
  protectedApi()
  refreshApi(() => HttpResponse.json({ accessToken: 'new-token', role: 'ADMIN' }))

  const { data } = await createClient().get('/me')

  expect(data).toEqual({ ok: true })
  expect(useAuthStore.getState().accessToken).toBe('new-token')
})

it('동시에 401을 받아도 refresh는 한 번만 보내고 모두 다시 보낸다', async () => {
  useAuthStore.getState().setSession('expired-token', 'ADMIN')
  protectedApi()
  const refresh = refreshApi(() => HttpResponse.json({ accessToken: 'new-token', role: 'ADMIN' }))
  const client = createClient()

  const results = await Promise.all([client.get('/me'), client.get('/me'), client.get('/me')])

  expect(results.map(({ data }) => data)).toEqual([{ ok: true }, { ok: true }, { ok: true }])
  expect(refresh.count).toBe(1)
})

it('refresh가 실패하면 401 에러를 그대로 던지고 세션을 지운다', async () => {
  useAuthStore.getState().setSession('expired-token', 'ADMIN')
  protectedApi()
  refreshApi(() => new HttpResponse(null, { status: 401 }))

  await expect(createClient().get('/me')).rejects.toMatchObject({ response: { status: 401 } })
  expect(useAuthStore.getState()).toMatchObject({ accessToken: null, role: null })
})

it('다시 보낸 요청도 401이면 refresh를 반복하지 않는다', async () => {
  useAuthStore.getState().setSession('expired-token', 'ADMIN')
  server.use(http.get('*/api/me', () => new HttpResponse(null, { status: 401 })))
  const refresh = refreshApi(() => HttpResponse.json({ accessToken: 'new-token', role: 'ADMIN' }))

  await expect(createClient().get('/me')).rejects.toMatchObject({ response: { status: 401 } })
  expect(refresh.count).toBe(1)
})
