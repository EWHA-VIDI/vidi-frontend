# CI 검증

PR마다 Frontend CI가 lint, format, typecheck, Vitest와 build를 검사한다.
PR Title은 별도 workflow에서 실행하며 커밋 훅과 같은 validator를 사용한다.
제목은 `type(scope): 작업 내용 [VIDI-번호]`로 작성하고 scope는 생략할 수 있다.

```bash
npm run verify
npm run test:conventions
```

컨벤션 검사는 허용한 type, 잘못된 제목, Jira 키 누락·중복 등을 확인한다.
Frontend CI에서 회귀 검사를 실행하고 PR Title은 현재 PR 제목만 검사한다.
commit-msg 훅은 같은 validator를 사용해 형식이 틀린 커밋 메시지를 차단한다.
현재 커밋의 CI와 제목 검사는 모두 통과해야 병합한다.
