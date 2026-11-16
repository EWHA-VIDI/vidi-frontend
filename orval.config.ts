import { defineConfig } from 'orval'

import { getApiTarget } from './config/apiTarget.ts'

export default defineConfig({
  vidi: {
    input: `${getApiTarget()}/v3/api-docs`,
    output: {
      target: 'src/api/generated/api.ts',
      schemas: 'src/api/generated/model',
      client: 'react-query',
      httpClient: 'axios',
      mode: 'tags-split',
      clean: true,
      override: {
        mutator: {
          path: 'src/api/mutator.ts',
          name: 'apiMutator',
        },
      },
    },
  },
})
