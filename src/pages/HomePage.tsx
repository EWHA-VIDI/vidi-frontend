import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { ScreenShell } from '@/components/layout/ScreenShell'
import { ROUTES } from '@/constants/routes'

export function HomePage() {
  return (
    <ScreenShell
      eyebrow="INVESTIGATION WORKSPACE"
      title="VIDI"
      description="계정·시간·문장 관계를 분석하는 유튜브 바이럴 댓글 탐지 지원 도구"
    >
      <nav className="action-row" aria-label="시작 메뉴">
        <Link className="primary-button" to={ROUTES.login}>
          로그인
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <Link className="secondary-button" to={ROUTES.signup}>
          조사관 가입 신청
        </Link>
      </nav>
    </ScreenShell>
  )
}
