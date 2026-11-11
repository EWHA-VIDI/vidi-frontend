export default {
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^(feat|fix|refactor|test|docs|chore|hotfix|release)\(([a-z0-9_-]+)\): (.+) \[(VIDI-[0-9]+)\]$/,
      headerCorrespondence: ['type', 'scope', 'subject', 'ticket'],
    },
  },
  rules: {
    'header-max-length': [2, 'always', 120],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'test', 'docs', 'chore', 'hotfix', 'release'],
    ],
    'scope-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
  },
}
