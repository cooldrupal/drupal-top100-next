'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

function NavigationProgress() {
  const pathname = usePathname()

  useEffect(() => {
    NProgress.done()
  }, [pathname])

  useEffect(() => {
    const handlePopState = () => {
      NProgress.start()
    }

    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')

      if (link && link.href && !link.target) {
        try {
          const url = new URL(link.href)
          const currentUrl = new URL(window.location.href)

          if (url.origin === currentUrl.origin && url.pathname !== currentUrl.pathname) {
            NProgress.start()
          }
        } catch (error) {

        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    document.addEventListener('click', handleLinkClick)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleLinkClick)
    }
  }, [])

  return null
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NavigationProgress />
    </>
  )
}
