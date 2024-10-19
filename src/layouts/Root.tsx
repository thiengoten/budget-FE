import { Sidebar } from '@/components/admin-panel/sidebar'
import { Toaster } from '@/components/ui/toaster'
import { useSidebarToggle } from '@/hooks/useStore'
import { cn } from '@/lib/utils'
import { Outlet } from 'react-router-dom'

export default function Root() {
  const toggle = useSidebarToggle()

  const { isOpen } = toggle ?? {}
  return (
    <>
      <Sidebar />
      <main
        className={cn(
          'min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300',
          !isOpen ? 'lg:ml-[90px]' : 'lg:ml-72'
        )}
      >
        <Outlet />
      </main>
      <footer
        className={cn(
          'transition-[margin-left] ease-in-out duration-300',
          isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72'
        )}
      >
        {/* <Footer /> */}
      </footer>
      <Toaster />
    </>
  )
}
