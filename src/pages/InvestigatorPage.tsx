import { ScreenShell } from '@/components/layout/ScreenShell'

export function InvestigatorPage() {
  return (
    <ScreenShell
      eyebrow="INVESTIGATOR WORKSPACE"
      title="조사관 화면"
      description="전달된 후보의 신호와 근거를 검토하고 본인의 조사 결과를 기록합니다."
    >
      <div className="placeholder-line" />
    </ScreenShell>
  )
}
