import type { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'

type ScreenShellProps = PropsWithChildren<{
  eyebrow: string
  title: string
  description: string
}>

export function ScreenShell({ eyebrow, title, description, children }: ScreenShellProps) {
  return (
    <main className="screen-shell">
      <header className="topbar">
        <Link className="wordmark" to={ROUTES.home}>
          VIDI
        </Link>
        <span>Viral Detection Intelligence</span>
      </header>
      <section className="screen-content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lead">{description}</p>
        {children}
      </section>
    </main>
  )
}
