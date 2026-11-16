import { QueryClient } from '@tanstack/react-query'

import { ApiRequestError } from '@/lib/apiError'

const MAX_QUERY_RETRY = 1

// 조회 실패 중 다시 시도해서 나아질 수 있는 경우만 재시도
// 네트워크 오류·타임아웃(status 없음)과 5xx만 해당하고, 4xx는 다시 보내도 결과가 같으므로 재시도하지 않음
export function shouldRetryQuery(failureCount: number, error: unknown) {
  if (failureCount >= MAX_QUERY_RETRY) return false
  if (!(error instanceof ApiRequestError)) return false
  return error.status === undefined || error.status >= 500
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: shouldRetryQuery,
      refetchOnWindowFocus: false,
    },
    mutations: {
      // 생성·수정 요청은 두 번 처리될 수 있어 재시도하지 않음
      retry: false,
    },
  },
})
