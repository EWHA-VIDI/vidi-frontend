import { loadEnv } from 'vite'

export function getApiTarget(mode = 'development') {
  const environment = loadEnv(mode, process.cwd(), 'API_')
  return (environment.API_PROXY_TARGET || 'http://localhost:8080').replace(/\/+$/, '')
}
