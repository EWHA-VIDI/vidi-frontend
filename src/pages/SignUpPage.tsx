import { ScreenShell } from '@/components/layout/ScreenShell'

export function SignUpPage() {
  return (
    <ScreenShell
      eyebrow="INVESTIGATOR REGISTRATION"
      title="조사관 가입 신청"
      description="조사관 인증 정보와 증빙 자료를 제출하는 화면이 연결될 위치입니다."
    >
      <div className="mt-12 h-px w-full max-w-lg bg-gradient-to-r from-primary-600 to-transparent" />
    </ScreenShell>
  )
}
