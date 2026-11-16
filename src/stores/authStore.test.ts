import { useAuthStore } from '@/stores/authStore'

const initialState = useAuthStore.getState()

afterEach(() => useAuthStore.setState(initialState, true))

it('처음에는 세션 복구 전 상태다', () => {
  expect(useAuthStore.getState()).toMatchObject({
    accessToken: null,
    role: null,
    isInitialized: false,
  })
})

it('세션을 저장하면 복구가 끝난 로그인 상태가 된다', () => {
  useAuthStore.getState().setSession('access-token', 'ADMIN')

  expect(useAuthStore.getState()).toMatchObject({
    accessToken: 'access-token',
    role: 'ADMIN',
    isInitialized: true,
  })
})

it('세션을 지우면 복구가 끝난 비로그인 상태가 된다', () => {
  useAuthStore.getState().setSession('access-token', 'ADMIN')
  useAuthStore.getState().clearSession()

  expect(useAuthStore.getState()).toMatchObject({
    accessToken: null,
    role: null,
    isInitialized: true,
  })
})
