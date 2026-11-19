import '@/styles/globals.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { restoreSession } from '@/api/authSession'
import { App } from '@/app/App'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element not found')
}

// 새로고침하면 메모리의 access token이 사라지므로 refresh 쿠키로 세션을 복구함
// 렌더링과 함께 시작하고, 끝나면 authStore.isInitialized가 true가 됨
void restoreSession()

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
