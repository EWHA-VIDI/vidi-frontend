# TypeScript

- 담당: 뼈대·설정 담당자

## 규칙

- `strict` 모드를 유지한다.
- 컴포넌트, 훅, 유틸리티는 named export를 사용한다.
- Props와 함수 입력 타입은 `type`으로 선언한다.
- 타입만 가져올 때 `import type`을 사용한다.
- API 응답 타입은 Orval 생성 타입을 우선 사용한다.
- 서버 응답의 nullable 값과 선택 입력의 optional 값을 구분한다.
- 사용자 입력은 feature의 Zod 스키마로 검증한다.
- `unknown`을 검사해 좁힌 뒤 사용한다.

## 하지 않는 것

- `any`, non-null assertion, 무분별한 type assertion을 사용하지 않는다.
- 같은 API 타입을 페이지마다 다시 선언하지 않는다.
- Props 안에 API 원본 응답 전체를 필요 없이 전달하지 않는다.
- `src/api/generated`의 타입을 직접 수정하지 않는다.

## 예시

```ts
type CandidateBadgeProps = {
  score: number
  label: string
}

export function CandidateBadge({ score, label }: CandidateBadgeProps) {
  return <span>{`${label} ${score}%`}</span>
}
```
