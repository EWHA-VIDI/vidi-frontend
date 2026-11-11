import { defineConfig } from 'orval'

export default defineConfig({
  vidi: {
    input: 'http://localhost:8080/v3/api-docs',
    output: {
      target: 'src/api/generated/api.ts',
      schemas: 'src/api/generated/model',
      client: 'react-query',
      mode: 'tags-split',
      clean: true,
    },
  },
})
