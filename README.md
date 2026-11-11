# VIDI Frontend

유튜브 댓글의 계정·시간·문장 관계를 분석해 조직적 바이럴 의심 패턴을 탐지하는 VIDI의 프론트엔드입니다.

## 요구 환경

- Node.js 24
- npm 11

## 실행

```bash
nvm use
npm ci
npm run dev
```

개발 서버는 `http://localhost:5173`에서 실행됩니다. `/api` 요청은 로컬 백엔드 `http://localhost:8080`으로 전달됩니다.

## 검증

```bash
npm run verify
```

## API 타입 생성

백엔드 Swagger가 실행 중일 때 다음 명령을 사용합니다.

```bash
npm run api:generate
```

`src/api/generated`의 생성 코드는 직접 수정하지 않습니다. 작업 전 `AGENTS.md`와 관련 `docs/rules` 파일을 확인합니다.
