import { types, validateTitle } from './scripts/conventions.cjs'

export default {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'jira-title': ({ header }) => [
          validateTitle(header ?? ''),
          'type(scope): 작업 내용 [VIDI-123] 형식을 사용한다. scope는 선택이다.',
        ],
      },
    },
  ],
  rules: {
    'type-enum': [2, 'always', types],
    'subject-case': [0],
    'header-max-length': [2, 'always', 120],
    'jira-title': [2, 'always'],
  },
}
