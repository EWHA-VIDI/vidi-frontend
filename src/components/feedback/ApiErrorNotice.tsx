import type { ApiError } from '@/types/api'

type ApiErrorNoticeProps = { error: ApiError }

export function ApiErrorNotice({ error }: ApiErrorNoticeProps) {
  return (
    <section
      className="rounded-xl border border-danger-line bg-danger-soft px-5 py-4 text-danger"
      role="alert"
    >
      <strong>요청을 처리하지 못했습니다.</strong>
      <p className="my-1.5">{error.message}</p>
      <small className="font-mono">{`Trace ID: ${error.traceId}`}</small>
    </section>
  )
}
