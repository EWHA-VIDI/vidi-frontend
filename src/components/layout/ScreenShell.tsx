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
    <main className="min-h-screen bg-scaffold">
      <header className="mx-auto flex h-20 max-w-6xl items-center justify-between border-b border-line px-6 text-xs tracking-wider text-ink-500 uppercase">
        <Link
          className="font-serif text-3xl font-bold tracking-tight text-ink-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-600"
          to={ROUTES.home}
        >
          VIDI
        </Link>
        <span className="hidden sm:block">Viral Detection Intelligence</span>
      </header>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-20 sm:pt-32">
        <p className="text-xs font-bold tracking-widest text-primary-600">{eyebrow}</p>
        <h1 className="my-5 max-w-3xl text-5xl leading-none font-semibold tracking-tight sm:text-8xl">
          {title}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-ink-700 sm:text-xl">{description}</p>
        {children}
      </section>
    </main>
  )
}
