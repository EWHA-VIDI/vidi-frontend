import type { AxiosRequestConfig } from 'axios'

import { apiClient } from '@/api/client'
import type { ApiRequestError } from '@/lib/apiError'

// orval 생성 함수가 apiClient로 요청하도록 연결하는 함수
// 응답 본문(data)만 돌려줌
export function apiMutator<T>(config: AxiosRequestConfig, options?: AxiosRequestConfig) {
  return apiClient.request<T>({ ...config, ...options }).then(({ data }) => data)
}

// 생성 훅의 error 타입. apiClient가 모든 실패를 ApiRequestError로 바꿔서 던짐
// ErrorBody는 Swagger에 적힌 에러 응답 스키마
export type ErrorType<ErrorBody> = ApiRequestError & { data?: ErrorBody }

export type BodyType<BodyData> = BodyData
