import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, expect, it, vi } from 'vitest'

import { getApiTarget } from './apiTarget.ts'

let directory: string

beforeEach(() => {
  directory = mkdtempSync(join(tmpdir(), 'vidi-api-target-'))
  vi.spyOn(process, 'cwd').mockReturnValue(directory)
  vi.stubEnv('API_PROXY_TARGET', undefined)
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllEnvs()
  rmSync(directory, { recursive: true, force: true })
})

it('설정하지 않은 환경은 로컬 8080을 사용한다', () => {
  expect(getApiTarget()).toBe('http://localhost:8080')
})

it('env 파일의 서버 주소를 읽고 끝 슬래시를 제거한다', () => {
  writeFileSync(join(directory, '.env.local'), 'API_PROXY_TARGET=http://localhost:9090/\n')
  expect(getApiTarget()).toBe('http://localhost:9090')
})

it('프로세스 설정은 파일보다 우선한다', () => {
  writeFileSync(join(directory, '.env.local'), 'API_PROXY_TARGET=http://localhost:9090\n')
  vi.stubEnv('API_PROXY_TARGET', 'http://localhost:9191')
  expect(getApiTarget()).toBe('http://localhost:9191')
})
