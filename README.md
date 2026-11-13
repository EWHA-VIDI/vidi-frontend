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

개발 서버는 `http://localhost:5173`에서 실행됩니다. `.env.example`을 `.env.local`로 복사하고
`API_PROXY_TARGET`을 설정하면 개발 프록시와 Orval이 같은 백엔드를 사용합니다. 기본값은 `http://localhost:8080`입니다.
`API_` 변수는 개발 도구 전용이며 브라우저에 주입하지 않습니다. `.env` 파일은 예시만 커밋합니다.

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

## 배포

이 레포의 `Dockerfile`과 `nginx.conf`에서 FE 이미지를 직접 관리합니다.

```bash
docker build -t vidi-frontend:local .
```

Nginx는 SPA fallback과 `/api/` 프록시를 제공합니다. 같은 Docker 네트워크의
`backend:8080`에 BE를 연결하고 `/healthz`와 `/healthz/backend`로 상태를 확인합니다.
실제 배포 workflow는 배포 단계에서 FE 레포에 추가합니다. BE가 FE SHA를 받아 대신 배포하지 않습니다.
공통 서버·DB·환경변수 기준은 [BE 배포 문서](https://github.com/EWHA-VIDI/vidi-backend/blob/infra/VIDI-14-container-deployment/docs/deployment.md)를 참고합니다.

TLS 검사 프록시 환경에서는 `docker build --secret id=proxy_ca,src=인증서경로 ...`로
빌드에만 CA를 전달하고 TLS 검증을 끄지 않습니다.

## 담당자에게 넘기는 범위

인증·공통 UI·API 타입은 [임시 뼈대 안내](docs/scaffold-handoff.md)를 기준으로 담당 이슈에서 이어서 정리합니다.

## 실행 화면

[초기 화면 스크린샷](docs/images/scaffold.png)을 참고합니다.
