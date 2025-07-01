import type { ReactNode } from "react"
import { QueryProvider } from '@/components/providers/QueryProvider'
import { ProgressProvider } from '@/components/providers/ProgressProvider'

import "@/styles/globals.css"

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <div className="w-full flex justify-center mt-4">
          <div className="w-full max-w-screen-lg px-6 py-4">
            <QueryProvider>
              <ProgressProvider>
                {children}
              </ProgressProvider>
            </QueryProvider>
          </div>
        </div>
      </body>
    </html>
  )
}
