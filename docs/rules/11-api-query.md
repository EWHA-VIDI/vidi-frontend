# API 호출과 Query

담당자: 김서현

API 함수를 어디에 두고, TanStack Query와 orval 생성 코드를 어떻게 쓰는지 정한다. 응답 형식은 `10-api-contract.md`를 따른다.

## orval 생성 코드

- API 함수, 요청·응답 타입, Query 훅은 orval이 `src/api/generated`에 생성한다. 같은 API를 손으로 다시 만들지 않는다.
- `src/api/generated`의 파일은 직접 수정하지 않는다. 바꿔야 하면 BE Swagger나 `orval.config.ts`를 고치고 다시 생성한다.
- 생성 함수는 `src/api/client.ts`의 `apiClient`로 요청한다. axios를 직접 import해서 요청하지 않는다.
- BE API가 바뀌면 다시 생성하고, 생성 결과를 그 변경을 쓰는 PR에 함께 커밋한다.

```bash
# .env의 API_PROXY_TARGET에 있는 BE 서버가 켜져 있어야 한다
npm run api:generate
```

## API 함수와 훅 위치

| 위치                        | 두는 것                                                   |
| --------------------------- | --------------------------------------------------------- |
| `src/api/generated`         | orval 생성 함수, 타입, Query 훅                           |
| `src/api`                   | `apiClient`, `queryClient`처럼 모든 기능이 함께 쓰는 설정 |
| `src/features/<기능>/hooks` | 생성 훅에 화면 동작(캐시 갱신, 이동, 알림)을 붙인 훅      |

- 생성 훅을 그대로 쓸 수 있으면 감싸지 않고 바로 쓴다.
- 요청 성공 후 캐시 갱신, 화면 이동, 알림처럼 동작을 붙일 때만 `features/<기능>/hooks`에 `useXxx` 훅을 만든다.
- 여러 기능이 같은 훅을 쓰면 feature끼리 import하지 않고 `src/hooks`로 옮긴다.

## Query key

- Query key는 orval이 만든 `getXxxQueryKey()`를 쓴다. `['members', id]`처럼 배열을 직접 쓰지 않는다.
- 캐시를 무효화할 때도 같은 key 함수를 쓴다.

```ts
await queryClient.invalidateQueries({ queryKey: getGetMembersQueryKey() })
```

## Query 옵션

- `staleTime`, `retry` 같은 기본값은 `src/api/queryClient.ts`에서만 정한다.
- 화면마다 기본값과 다르게 해야 할 때만 훅을 호출할 때 옵션을 넘긴다.
- 서버에서 받은 데이터를 Zustand store에 복사하지 않는다. 서버 상태는 Query 캐시에서 읽는다.
