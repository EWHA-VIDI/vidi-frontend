# VIDI Frontend 작업 지침

VIDI는 유튜브 댓글의 계정·시간·문장 관계를 분석해 조직적 바이럴 의심 패턴을 탐지하는 조사 지원 서비스다.

## 작업 시작

- 변경 전에 `git status --short --branch`로 브랜치와 기존 변경을 확인한다.
- 작업 전에 변경 범위와 관련된 `docs/rules` 파일을 읽는다.
- 기존 변경과 관련 없는 파일을 수정하거나 되돌리지 않는다.
- 실행하지 않은 검사와 테스트를 성공했다고 기록하지 않는다.

## 명령어

- 의존성 설치: `npm ci`
- 개발 서버: `npm run dev`
- 린트: `npm run lint`
- 포맷 검사: `npm run format:check`
- 타입 검사: `npm run typecheck`
- 테스트: `npm run test:run`
- 프로덕션 빌드: `npm run build`
- 전체 검증: `npm run verify`
- API 생성: `npm run api:generate`

## 꼭 지킬 규칙

- import 방향은 pages에서 features로, features에서 공통 폴더로만 향하게 한다.
- feature끼리 직접 import하지 않고 함께 쓰는 코드는 공통 폴더로 이동한다.
- 서버 상태는 TanStack Query, 전역 클라이언트 상태는 Zustand로 관리한다.
- 폼 스키마는 해당 feature의 `schemas` 폴더에 둔다.
- `src/api/generated`의 생성 코드를 직접 수정하지 않는다.
- 프로젝트 내부 import는 설정된 경로 alias를 사용한다.
- 컴포넌트, 훅, 유틸리티는 named export를 사용한다.
- API 키와 비밀값을 `VITE_` 환경변수에 넣지 않는다.
- 에러 화면에 서버에서 받은 traceId를 확인할 수 있게 한다.

## 규칙 파일

- `docs/rules/00-git-convention.md`: 브랜치, 커밋, PR 규칙
- `docs/rules/01-lint-format.md`: ESLint, Prettier, import 규칙
- `docs/rules/02-typescript.md`: export, Props, 타입 규칙
- `docs/rules/10-owner.md`: 담당자 2 규칙
- `docs/rules/20-owner.md`: 담당자 3 규칙
