# TypeScript

담당: 박지연

## 규칙

- strict와 noUncheckedIndexedAccess를 유지한다.
- 컴포넌트, 훅, 유틸리티는 named export를 사용한다.
- Vite·Vitest 등 도구 설정만 도구가 요구하는 default export를 사용한다.
- Props와 함수 입력은 type으로 선언하고 interface와 혼용하지 않는다.
- 타입만 가져올 때 import type을 사용한다.
- API 응답은 생성 타입을 우선하고 null과 optional의 의미를 구분한다.
- 사용자 입력은 feature의 Zod 스키마로 검사한다.
- unknown은 검사해 좁힌 뒤 사용한다.

## 하지 않는 것

- any, non-null assertion, 근거 없는 type assertion을 사용하지 않는다.
- API 타입을 페이지마다 중복 선언하지 않는다.
- `src/api/generated`를 직접 수정하지 않는다.
- 점수를 확률이나 백분율로 바꾸어 표시하지 않는다.

## 예시

`src/components/feedback/ApiErrorNotice.tsx`의 실제 Props 선언을 사용한다.

```ts
type ApiErrorNoticeProps = {
  message: string
  traceId?: string
}
```
