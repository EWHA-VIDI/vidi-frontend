import { Link } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'

export function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-canvas p-6">
      <section className="w-full max-w-xl text-left">
        <p className="text-xs font-bold tracking-widest text-primary-600">404</p>
        <h1 className="my-5 text-4xl font-semibold tracking-tight">페이지를 찾을 수 없습니다.</h1>
        <Link
          className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-primary-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-600 motion-reduce:transition-none"
          to={ROUTES.home}
        >
          홈으로 돌아가기
        </Link>
      </section>
    </main>
  )
}
