import { ScreenShell } from '@/components/layout/ScreenShell'

export function AdminPage() {
  return (
    <ScreenShell
      eyebrow="ADMIN WORKSPACE"
      title="관리자 화면"
      description="탐지 후보, 내보내기, 가입 심사와 사용자를 관리합니다."
    >
      <div className="placeholder-line" />
    </ScreenShell>
  )
}
