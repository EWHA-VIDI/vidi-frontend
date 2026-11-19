# API 계약

담당자: 김서현

BE와 FE가 주고받는 요청·응답 형식을 정한다. BE 레포의 `10-api-contract.md`와 같은 내용을 유지하고, 바꿀 때는 두 레포 문서를 함께 수정한다.

## 요청

- API 경로는 `/api`로 시작한다. FE는 `VITE_API_BASE_URL`(기본값 `/api`)을 baseURL로 쓰고, 개발 서버에서는 Vite proxy가 BE로 전달한다.
- 요청과 응답 본문은 JSON으로 주고받는다.

## 성공 응답

- 응답 DTO를 감싸지 않고 그대로 보낸다. `{ success, data }` 같은 공통 래퍼를 쓰지 않는다.
- 성공 여부와 종류는 HTTP 상태 코드로 구분한다.

| 상태 | 사용하는 경우                   |
| ---- | ------------------------------- |
| 200  | 조회, 수정 성공                 |
| 201  | 생성 성공                       |
| 204  | 본문 없이 성공 (삭제, 로그아웃) |

## 목록 응답

- 페이지가 있는 목록은 `PageResponse<T>`로 보낸다. 필드 이름은 `src/types/api.ts`와 같게 맞춘다.

```ts
export type PageResponse<T> = {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  hasNext: boolean
}
```

## 실패 응답

- 실패하면 항상 `{ code, message, traceId }` 세 필드를 모두 보낸다. 필드를 빼거나 다른 형식으로 보내지 않는다.

```ts
export type ApiError = {
  code: string
  message: string
  traceId: string
}
```

- `code`는 `도메인_상황` 형식의 대문자로 쓴다. 예: `MEMBER_NOT_FOUND`, `COMMON_INVALID_INPUT`
- `message`는 사용자에게 그대로 보여 줄 수 있는 한국어 문장으로 쓴다.
- `traceId`는 BE 로그의 traceId와 같은 값을 보낸다. FE는 traceId를 만들어 붙이지 않고, 서버가 보낸 값만 화면에 보여 준다.
- 화면 분기는 `message`가 아니라 `code`로 한다.

| 상태 | 사용하는 경우                 |
| ---- | ----------------------------- |
| 400  | 입력값 검증 실패, 잘못된 요청 |
| 401  | 로그인하지 않음, 토큰 만료    |
| 403  | 로그인했지만 권한 없음        |
| 404  | 대상이 없음                   |
| 409  | 중복, 현재 상태와 충돌        |
| 500  | 처리하지 못한 서버 오류       |

실제 에러 코드 목록은 이 문서에 옮겨 적지 않는다. BE의 `CommonErrorCode`와 도메인별 `ErrorCode` enum을 기준으로 한다.

## enum 값

- enum 값은 BE enum 이름을 문자열 그대로 주고받는다. 값 목록은 문서에 옮겨 적지 않고 BE enum과 orval 생성 타입을 기준으로 한다.
- 권한 값에 `ROLE_` 접두사를 붙이지 않는다. 접두사는 BE Security 내부에서만 쓴다.
