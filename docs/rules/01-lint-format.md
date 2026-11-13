# 린트와 포맷

담당: 박지연

## 규칙

- TypeScript와 TSX는 ESLint와 Prettier를 함께 통과한다.
- 커밋 전 `npm run lint`, `npm run format:check`, `npm run typecheck`를 실행한다.
- PR 전 `npm run verify`와 `npm run test:conventions`를 실행한다.
- pre-commit은 lint-staged로 변경 파일을 검사하고 commit-msg는 Jira 형식을 검사한다.
- 내부 import는 `@/` alias를 사용하고 상위 폴더 상대 경로로 계층 검사를 우회하지 않는다.
- import 정렬은 simple-import-sort에 맡기고 `npm run lint:fix`로 정리한다.
- pages는 features와 공통을 사용하고 features는 자신의 내부와 공통만 사용한다.
- 공통 코드는 app, pages, features를 import하지 않는다.
- 환경 설정은 `.env.example`에 문서화하고 VITE 접두사 값은 공개된 값으로 취급한다.
- package.json과 Vite·TS 설정 변경은 설정 담당자에게 요청한다.

## 하지 않는 것

- feature 간 직접 import와 페이지 간 조립 의존을 만들지 않는다.
- 린트 실패를 숨기기 위해 disable 주석을 상시 사용하지 않는다.
- `src/api/generated`와 lockfile을 손으로 포맷하지 않는다.
- VITE 환경변수에 API 키·비밀번호를 저장하지 않는다.

## 예시

- `HomePage.tsx`는 `@/components/layout/ScreenShell`과 `@/constants/routes`를 사용한다.
- `src/lib/cn.ts`는 clsx와 tailwind-merge를 조합한다.
- 전체 검증은 `npm run verify`로 실행한다.
