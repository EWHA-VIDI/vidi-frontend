import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'

import { queryClient as appQueryClient } from '@/api/queryClient'

// 테스트마다 캐시가 섞이지 않도록 새 QueryClient를 만듦
// 재시도 기준은 앱과 같게 두고 대기 시간만 없앰
export function createTestQueryClient() {
  const defaults = appQueryClient.getDefaultOptions()

  return new QueryClient({
    defaultOptions: {
      queries: { ...defaults.queries, retryDelay: 0 },
      mutations: defaults.mutations,
    },
  })
}

export function createQueryWrapper(client = createTestQueryClient()) {
  return function QueryWrapper({ children }: PropsWithChildren) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
  }
}
