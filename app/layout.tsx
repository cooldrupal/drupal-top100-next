import type { ReactNode } from "react"

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
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
