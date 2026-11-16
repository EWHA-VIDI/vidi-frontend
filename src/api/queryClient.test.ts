import { shouldRetryQuery } from '@/api/queryClient'
import { ApiRequestError } from '@/lib/apiError'

const networkError = new ApiRequestError('연결 실패', {})
const serverError = new ApiRequestError('서버 오류', { status: 500 })
const notFoundError = new ApiRequestError('없음', { status: 404 })

it('네트워크 오류와 5xx는 한 번만 다시 시도한다', () => {
  expect(shouldRetryQuery(0, networkError)).toBe(true)
  expect(shouldRetryQuery(0, serverError)).toBe(true)
  expect(shouldRetryQuery(1, serverError)).toBe(false)
})

it('4xx와 ApiRequestError가 아닌 오류는 다시 시도하지 않는다', () => {
  expect(shouldRetryQuery(0, notFoundError)).toBe(false)
  expect(shouldRetryQuery(0, new Error('render failed'))).toBe(false)
})
