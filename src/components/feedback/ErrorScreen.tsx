import { ApiErrorNotice } from '@/components/feedback/ApiErrorNotice'
import { getApiError } from '@/lib/apiError'

type ErrorScreenProps = { error: unknown }

export function ErrorScreen({ error }: ErrorScreenProps) {
  const apiError = getApiError(error)

  return (
    <main className="grid min-h-screen place-items-center bg-canvas p-6">
      <section className="w-full max-w-xl" aria-labelledby="error-title">
        <p className="text-xs font-bold tracking-widest text-primary-600">SYSTEM ERROR</p>
        <h1 id="error-title" className="my-5 text-4xl font-semibold tracking-tight">
          화면을 불러오지 못했습니다.
        </h1>
        {apiError ? (
          <ApiErrorNotice error={apiError} />
        ) : (
          <p className="text-ink-700">잠시 후 다시 시도해 주세요.</p>
        )}
        <button
          className="mt-8 rounded-xl bg-primary-700 px-5 py-3 font-semibold text-white hover:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-600"
          type="button"
          onClick={() => window.location.reload()}
        >
          새로고침
        </button>
      </section>
    </main>
  )
}
