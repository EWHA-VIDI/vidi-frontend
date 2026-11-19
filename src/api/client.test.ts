import { http, HttpResponse } from 'msw'

import { apiClient } from '@/api/client'
import { ApiRequestError, getApiError } from '@/lib/apiError'
import { server } from '@/test/mocks/server'

const errorBody = {
  code: 'MEMBER_NOT_FOUND',
  message: '회원을 찾을 수 없습니다.',
  traceId: 'trace-1',
}

async function catchError(request: Promise<unknown>) {
  try {
    await request
  } catch (error) {
    return error
  }
  throw new Error('요청이 실패해야 한다')
}

it('기본 baseURL로 요청하고 성공 응답은 그대로 돌려준다', async () => {
  server.use(http.get('*/api/members/1', () => HttpResponse.json({ id: 1 })))

  const response = await apiClient.get('/members/1')

  expect(response.data).toEqual({ id: 1 })
})

it('서버 ErrorResponse를 ApiRequestError로 바꾸고 traceId를 유지한다', async () => {
  server.use(http.get('*/api/members/1', () => HttpResponse.json(errorBody, { status: 404 })))

  const error = await catchError(apiClient.get('/members/1'))

  expect(error).toBeInstanceOf(ApiRequestError)
  expect(error).toMatchObject({ status: 404, message: errorBody.message, data: errorBody })
  expect(getApiError(error)).toEqual(errorBody)
})

it('ErrorResponse 형식이 아닌 실패 응답에는 traceId를 만들어 붙이지 않는다', async () => {
  server.use(http.get('*/api/members/1', () => new HttpResponse('Bad Gateway', { status: 502 })))

  const error = await catchError(apiClient.get('/members/1'))

  expect(error).toMatchObject({ status: 502, data: undefined })
  expect(getApiError(error)).toBeUndefined()
})

it('네트워크 오류는 status 없이 연결 실패 문구로 바꾼다', async () => {
  server.use(http.get('*/api/members/1', () => HttpResponse.error()))

  const error = await catchError(apiClient.get('/members/1'))

  expect(error).toBeInstanceOf(ApiRequestError)
  expect(error).toMatchObject({ status: undefined, message: expect.stringContaining('연결') })
})
