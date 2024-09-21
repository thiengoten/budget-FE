import { getMenuList } from '@/components/admin-panel/helpers'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useSidebarToggle } from '@/hooks/useStore'
import { cn } from '@/lib/utils'
import { EllipsisIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export function Menu() {
  const { pathname } = useLocation()
  const menuList = getMenuList(pathname)
  const { isOpen } = useSidebarToggle()

  return (
    <ScrollArea className='[&>div>div[style]]:!block'>
      <nav className='mt-8 h-full w-full'>
        <ul className='flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2'>
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn('w-full', groupLabel ? 'pt-5' : '')} key={index}>
              {isOpen ? (
                <p className='text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate'>
                  {groupLabel}
                </p>
              ) : (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className='w-full'>
                      <div className='w-full flex justify-center items-center'>
                        <EllipsisIcon className='h-5 w-5' />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side='right'>
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <ul className='flex flex-col w-full'>
                {menus.map(({ label, icon: IconComp, href, active }, index) => (
                  <div className='w-full' key={index}>
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={active ? 'secondary' : 'ghost'}
                            className='w-full justify-start h-10 mb-1'
                            asChild
                          >
                            <Link to={href}>
                              <span className={cn(!isOpen ? '' : 'mr-4')}>
                                <IconComp size={18} />
                              </span>
                              <p
                                className={cn(
                                  'max-w-[200px] truncate',
                                  !isOpen
                                    ? '-translate-x-96 opacity-0'
                                    : 'translate-x-0 opacity-100'
                                )}
                                aria-hidden={!isOpen}
                              >
                                {label}
                              </p>
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        {!isOpen && (
                          <TooltipContent side='right'>{label}</TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </ScrollArea>
  )
}
