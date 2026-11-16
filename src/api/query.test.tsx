import { useQuery } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'

import { apiMutator, type ErrorType } from '@/api/mutator'
import { ApiRequestError } from '@/lib/apiError'
import { server } from '@/test/mocks/server'
import { createQueryWrapper } from '@/test/queryClient'

type Member = { id: number; name: string }

// orval이 생성하는 조회 훅과 같은 방식으로 apiMutator를 호출하는 예시 훅
function useMemberQuery(id: number) {
  return useQuery<Member, ErrorType<unknown>>({
    queryKey: [`/api/members/${id}`],
    queryFn: ({ signal }) => apiMutator<Member>({ url: `/members/${id}`, method: 'GET', signal }),
  })
}

it('조회 훅이 apiClient를 거쳐 응답 본문을 받는다', async () => {
  server.use(http.get('*/api/members/1', () => HttpResponse.json({ id: 1, name: '김서현' })))

  const { result } = renderHook(() => useMemberQuery(1), { wrapper: createQueryWrapper() })

  await waitFor(() => expect(result.current.isSuccess).toBe(true))
  expect(result.current.data).toEqual({ id: 1, name: '김서현' })
})

it('4xx는 재시도하지 않고 ApiRequestError를 error로 돌려준다', async () => {
  let requestCount = 0
  const errorBody = { code: 'MEMBER_NOT_FOUND', message: '회원이 없습니다.', traceId: 't-1' }
  server.use(
    http.get('*/api/members/1', () => {
      requestCount += 1
      return HttpResponse.json(errorBody, { status: 404 })
    }),
  )

  const { result } = renderHook(() => useMemberQuery(1), { wrapper: createQueryWrapper() })

  await waitFor(() => expect(result.current.isError).toBe(true))
  expect(result.current.error).toBeInstanceOf(ApiRequestError)
  expect(result.current.error?.data).toEqual(errorBody)
  expect(requestCount).toBe(1)
})

it('5xx는 한 번 다시 시도한다', async () => {
  let requestCount = 0
  server.use(
    http.get('*/api/members/1', () => {
      requestCount += 1
      return new HttpResponse(null, { status: 503 })
    }),
  )

  const { result } = renderHook(() => useMemberQuery(1), { wrapper: createQueryWrapper() })

  await waitFor(() => expect(result.current.isError).toBe(true))
  expect(requestCount).toBe(2)
})
