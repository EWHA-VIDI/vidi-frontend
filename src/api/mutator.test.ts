import { http, HttpResponse } from 'msw'

import { apiMutator } from '@/api/mutator'
import { ApiRequestError } from '@/lib/apiError'
import { server } from '@/test/mocks/server'

it('apiClient로 요청하고 응답 본문만 돌려준다', async () => {
  server.use(
    http.get('*/api/members/1', ({ request }) =>
      HttpResponse.json({ id: 1, page: new URL(request.url).searchParams.get('page') }),
    ),
  )

  const data = await apiMutator<{ id: number }>({
    url: '/members/1',
    method: 'GET',
    params: { page: 0 },
  })

  expect(data).toEqual({ id: 1, page: '0' })
})

it('실패하면 apiClient가 바꾼 ApiRequestError를 그대로 던진다', async () => {
  const errorBody = { code: 'MEMBER_NOT_FOUND', message: '회원이 없습니다.', traceId: 't-1' }
  server.use(http.get('*/api/members/1', () => HttpResponse.json(errorBody, { status: 404 })))

  await expect(apiMutator({ url: '/members/1', method: 'GET' })).rejects.toBeInstanceOf(
    ApiRequestError,
  )
})
