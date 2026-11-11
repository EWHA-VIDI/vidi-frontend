# Lint and Format

- 담당: 뼈대·설정 담당자

## 규칙

- TypeScript와 TSX는 ESLint와 Prettier 검사를 모두 통과한다.
- 커밋 전 `npm run lint`, `npm run format:check`, `npm run typecheck`를 실행한다.
- PR 전 `npm run verify`를 실행한다.
- 프로젝트 내부 모듈은 `@/` alias로 import한다.
- import는 외부 패키지, 빈 줄, 내부 alias 순서로 작성한다.
- 같은 그룹 안에서는 경로를 알파벳순으로 정리한다.
- 반복되는 Tailwind 값은 디자인 토큰이나 공통 컴포넌트로 이동한다.
- 임의값 클래스는 디자인 토큰으로 표현할 수 없는 계산값에만 사용한다.

## 하지 않는 것

- 린트 실패를 숨기기 위해 disable 주석을 상시 사용하지 않는다.
- 소스에 `console.log`와 디버깅 코드를 남기지 않는다.
- 페이지마다 동일한 색상과 간격 값을 반복하지 않는다.
- generated 코드와 lockfile을 직접 포맷하지 않는다.

## 예시

- 내부 import: `import { cn } from '@/lib/cn'`
- 전체 검증: `npm run verify`
- 조건부 클래스: `cn('base-class', isActive && 'active-class')`
