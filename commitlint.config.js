export default {
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^(feat|fix|refactor|test|docs|chore|hotfix|infra|release)\(([a-z0-9_-]+)\): (.+) \[(VIDI-[0-9]+)\]$/,
      headerCorrespondence: ['type', 'scope', 'subject', 'ticket'],
    },
  },
  rules: {
    'header-max-length': [2, 'always', 120],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'test', 'docs', 'chore', 'hotfix', 'infra', 'release'],
    ],
    'scope-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
  },
}
