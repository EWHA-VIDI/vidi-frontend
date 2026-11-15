import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { ScreenShell } from '@/components/layout/ScreenShell'
import { ROUTES } from '@/constants/routes'

export function HomePage() {
  return (
    <ScreenShell
      eyebrow="INVESTIGATION WORKSPACE"
      title="VIDI"
      description="계정·시간·문장 관계를 근거로 조직적 바이럴 의심 패턴을 조사하는 지원 도구"
    >
      <nav className="mt-10 flex flex-col gap-3 sm:flex-row" aria-label="시작 메뉴">
        <Link
          className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-primary-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-600 motion-reduce:transition-none"
          to={ROUTES.login}
        >
          로그인
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-line bg-white/80 px-5 py-3 font-semibold transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-600 motion-reduce:transition-none"
          to={ROUTES.signup}
        >
          조사관 가입 신청
        </Link>
      </nav>
    </ScreenShell>
  )
}
