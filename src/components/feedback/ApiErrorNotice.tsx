type ApiErrorNoticeProps = {
  message: string
  traceId?: string
}

export function ApiErrorNotice({ message, traceId }: ApiErrorNoticeProps) {
  return (
    <section className="api-error" role="alert">
      <strong>요청을 처리하지 못했습니다.</strong>
      <p>{message}</p>
      {traceId ? <small>{`Trace ID: ${traceId}`}</small> : null}
    </section>
  )
}
