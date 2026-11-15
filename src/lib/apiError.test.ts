import { getApiError } from '@/lib/apiError'

const error = { code: 'ERROR', message: '요청 실패', traceId: 'server-trace' }

it('서버 오류, Axios 응답과 Router 응답에서 같은 API 오류를 읽는다', () => {
  expect(getApiError(error)).toEqual(error)
  expect(getApiError({ response: { data: error } })).toEqual(error)
  expect(getApiError({ data: error })).toEqual(error)
})

it('서버 응답이 없는 오류에는 traceId를 만들어 붙이지 않는다', () => {
  expect(getApiError(new Error('Network error'))).toBeUndefined()
  expect(getApiError({ message: 'Invalid shape' })).toBeUndefined()
  expect(getApiError(null)).toBeUndefined()
})
