import { ReactNode } from 'react'
import { AppMenu } from './app-menu'

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppMenu />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  )
}
