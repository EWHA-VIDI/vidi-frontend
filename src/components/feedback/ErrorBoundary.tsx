import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="screen-center">
          <section className="status-panel" aria-labelledby="error-title">
            <p className="eyebrow">SYSTEM ERROR</p>
            <h1 id="error-title">화면을 불러오지 못했습니다.</h1>
            <p>잠시 후 다시 시도해 주세요.</p>
            <button
              className="primary-button"
              type="button"
              onClick={() => window.location.reload()}
            >
              새로고침
            </button>
          </section>
        </main>
      )
    }

    return this.props.children
  }
}
