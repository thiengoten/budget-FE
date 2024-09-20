import { Button } from '@/components/ui/button'
import { useSidebarToggle } from '@/hooks/useStore'
import { cn } from '@/lib/utils'
import { ChevronLeft, PanelsTopLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Sidebar() {
  const toggle = useSidebarToggle()

  const { isOpen, setIsOpen } = toggle ?? {}

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300',
        !isOpen ? 'w-[90px]' : 'w-72'
      )}
    >
      {/* Toggle */}
      <div className='invisible lg:visible absolute top-[12px] -right-[16px] z-20'>
        <Button
          onClick={setIsOpen}
          className='rounded-md w-8 h-8'
          variant='outline'
          size='icon'
        >
          <ChevronLeft
            className={cn(
              'h-4 w-4 transition-transform ease-in-out duration-700',
              !isOpen ? 'rotate-180' : 'rotate-0'
            )}
          />
        </Button>
      </div>

      {/* Brand */}
      <div className='relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800'>
        <Button
          className={cn(
            'transition-transform ease-in-out duration-300 mb-1',
            !isOpen ? 'translate-x-1' : 'translate-x-0'
          )}
          variant='link'
          asChild
        >
          <Link to='/dashboard' className='flex items-center gap-2'>
            <PanelsTopLeft className='w-6 h-6 mr-1' />
            <h1
              className={cn(
                'font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300',
                !isOpen
                  ? '-translate-x-96 opacity-0 hidden'
                  : 'translate-x-0 opacity-100'
              )}
            >
              Brand
            </h1>
          </Link>
        </Button>
        {/* <Menu isOpen={sidebar?.isOpen} /> */}
      </div>
    </aside>
  )
}
