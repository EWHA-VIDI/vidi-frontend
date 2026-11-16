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
