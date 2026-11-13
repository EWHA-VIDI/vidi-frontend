# CI 검증

PR마다 Frontend CI가 lint, format, typecheck, Vitest와 build를 검사한다.
PR Title은 별도 workflow에서 실행하며 커밋 훅과 같은 validator를 사용한다.
제목은 `type(scope): 작업 내용 [VIDI-번호]`로 작성하고 scope는 생략할 수 있다.

```bash
npm run verify
npm run test:conventions
```

컨벤션 검사는 정상 type 13개와 잘못된 제목, Jira 키 누락·중복 등을 포함한 25개 테스트를 실행한다.
실제 Git commit-msg 훅이 잘못된 메시지를 차단하고 HEAD가 유지되는 것을 확인했다.

[잘못된 제목 실패 실행](https://github.com/EWHA-VIDI/vidi-frontend/actions/runs/43197893376)을
실제 PR 이벤트로 확인한 뒤 올바른 제목으로 복구했다. 이 실패는 의도한 음성 검증의 기록이다.
현재 커밋의 CI와 제목 검사는 모두 통과해야 병합한다.
