import { Link } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'

export function NotFoundPage() {
  return (
    <main className="screen-center">
      <section className="status-panel">
        <p className="eyebrow">404</p>
        <h1>페이지를 찾을 수 없습니다.</h1>
        <Link className="primary-button" to={ROUTES.home}>
          홈으로 돌아가기
        </Link>
      </section>
    </main>
  )
}
