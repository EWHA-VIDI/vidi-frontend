# 상태 관리

담당자: 김서현

값을 어디에 저장할지 정한다. 저장할 곳이 여러 군데로 보이면 아래 표에서 위에 있는 것부터 고른다.

## 값의 종류별 저장 위치

| 값                                        | 저장 위치                     | 예시                           |
| ----------------------------------------- | ----------------------------- | ------------------------------ |
| 서버에서 받은 데이터                      | TanStack Query 캐시           | 회원 목록, 분석 결과           |
| 주소로 공유하거나 새로고침 후에도 남을 값 | URL (경로, `useSearchParams`) | 목록 페이지 번호, 검색어, 필터 |
| 폼 입력값과 검증 에러                     | react-hook-form               | 로그인 폼, 회원가입 폼         |
| 한 컴포넌트 안에서만 쓰는 값              | `useState`                    | 모달 열림, 탭 선택             |
| 여러 화면이 함께 쓰는 클라이언트 값       | Zustand store                 | 로그인 토큰과 권한             |

## 서버 상태

- 서버에서 받은 데이터는 Query 캐시 한 곳에만 둔다. Zustand store나 `useState`에 복사하지 않는다.
- 데이터를 바꾼 뒤에는 store를 고치지 않고 관련 Query를 invalidate해서 다시 받는다.
- 조회와 캐시 규칙은 `11-api-query.md`를 따른다.

## Zustand store

- store는 서버에 없는 값을 여러 화면이 함께 써야 할 때만 만든다. 한 화면에서만 쓰는 값은 `useState`로 둔다.
- store는 `src/stores/xxxStore.ts`에 두고 `useXxxStore`로 export한다.
- store 값은 selector로 필요한 값만 꺼낸다. store 전체를 꺼내지 않는다.

```ts
const role = useAuthStore((state) => state.role)
```

- 값을 바꾸는 함수(`setSession`, `clearSession`)는 store 안에 정의하고, 컴포넌트에서 `setState`로 직접 바꾸지 않는다.

## 인증 토큰

- access token은 `authStore`의 메모리에만 둔다. localStorage, sessionStorage, 일반 쿠키에 저장하지 않는다.
- refresh token은 BE가 `HttpOnly`, `Secure`, `SameSite=Strict` 쿠키로 내려주고 관리한다. FE 코드에서 읽거나 저장하지 않는다.
- 새로고침하면 access token이 사라지므로, 앱을 시작할 때 refresh 요청으로 세션을 복구한다. 복구가 끝나기 전에는 로그인 여부를 판단하지 않는다.
