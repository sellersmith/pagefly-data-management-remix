import { Link, useLocation } from '@remix-run/react'
import { classNames } from '../utils/classnames'
import { Cog6ToothIcon, DocumentTextIcon, HomeIcon, PaintBrushIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Pages', href: '/pages', icon: DocumentTextIcon },
  { name: 'Sections', href: '/sections', icon: PuzzlePieceIcon },
  { name: 'Global Styling', href: '/global-styling', icon: PaintBrushIcon },
]

const teams: any[] = [
  // { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  // { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  // { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-sky-600 px-6 pb-4'>
      <div className='flex h-16 shrink-0 items-center'>
        <img className='h-8 w-auto' src='https://tailwindui.com/img/logos/mark.svg?color=white' alt='Your Company' />
      </div>
      <nav className='flex flex-1 flex-col'>
        <ul role='list' className='flex flex-1 flex-col gap-y-7'>
          <li>
            <ul role='list' className='-mx-2 space-y-1'>
              {navigation.map(item => {
                const isActive = item.href === location.pathname

                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={classNames(
                        isActive ? 'bg-sky-700 text-white' : 'text-sky-200 hover:text-white hover:bg-sky-700',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          isActive ? 'text-white' : 'text-sky-200 group-hover:text-white',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden='true'
                      />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>

          <li className='mt-auto'>
            <a
              href='#'
              className='group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-sky-200 hover:bg-sky-700 hover:text-white'
            >
              <Cog6ToothIcon className='h-6 w-6 shrink-0 text-sky-200 group-hover:text-white' aria-hidden='true' />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
