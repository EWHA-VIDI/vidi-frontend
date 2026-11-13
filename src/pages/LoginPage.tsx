import { ScreenShell } from '@/components/layout/ScreenShell'

export function LoginPage() {
  return (
    <ScreenShell
      eyebrow="AUTHENTICATION"
      title="로그인"
      description="인증 API 연결 전 화면 구조가 준비된 상태입니다."
    >
      <div className="mt-12 h-px w-full max-w-lg bg-gradient-to-r from-primary-600 to-transparent" />
    </ScreenShell>
  )
}
