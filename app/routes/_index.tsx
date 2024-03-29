import type { MetaFunction, TypedResponse } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { DB } from 'app/db.server'
import Layout from '../components/Layout'
import { classNames } from '../utils/classnames'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

export const meta: MetaFunction = () => {
  return [{ title: 'PageFly Management System' }]
}

export const loader = async (): Promise<TypedResponse<{ success: boolean; data: any }>> => {
  const collection = DB.wip.collection('shops')
  const data = await collection.find({}).toArray()

  return json({
    success: true,
    data,
  })
}

const statuses: { [key: string]: string } = {
  offline: 'text-gray-500 bg-gray-100/10',
  online: 'text-green-400 bg-green-400/10',
  error: 'text-rose-400 bg-rose-400/10',
}
const environments: { [key: string]: string } = {
  Preview: 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
  Production: 'text-indigo-400 bg-indigo-400/10 ring-indigo-400/30',
}

const deployments = [
  {
    id: 1,
    href: '#',
    projectName: 'ios-app',
    teamName: 'Planetaria',
    status: 'offline',
    statusText: 'Initiated 1m 32s ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
  },
  // More deployments...
]
const activityItems = [
  {
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    projectName: 'ios-app',
    commit: '2d89f0c8',
    branch: 'main',
    date: '1h',
    dateTime: '2023-01-23T11:00',
  },
  // More items...
]

export default function Index() {
  const { data } = useLoaderData<typeof loader>()

  return (
    <>
      <Layout>
        <div className='lg:pr-96'>
          {/* Deployment list */}
          <ul role='list' className='divide-y divide-white/5'>
            {deployments.map(deployment => (
              <li key={deployment.id} className='relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8'>
                <div className='min-w-0 flex-auto'>
                  <div className='flex items-center gap-x-3'>
                    <div className={classNames(statuses[deployment.status], 'flex-none rounded-full p-1')}>
                      <div className='h-2 w-2 rounded-full bg-current' />
                    </div>
                    <h2 className='min-w-0 text-sm font-semibold leading-6'>
                      <a href={deployment.href} className='flex gap-x-2'>
                        <span className='truncate'>{deployment.teamName}</span>
                        <span className='text-gray-400'>/</span>
                        <span className='whitespace-nowrap'>{deployment.projectName}</span>
                        <span className='absolute inset-0' />
                      </a>
                    </h2>
                  </div>
                  <div className='mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400'>
                    <p className='truncate'>{deployment.description}</p>
                    <svg viewBox='0 0 2 2' className='h-0.5 w-0.5 flex-none fill-gray-300'>
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <p className='whitespace-nowrap'>{deployment.statusText}</p>
                  </div>
                </div>
                <div
                  className={classNames(
                    environments[deployment.environment],
                    'rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset'
                  )}
                >
                  {deployment.environment}
                </div>
                <ChevronRightIcon className='h-5 w-5 flex-none text-gray-400' aria-hidden='true' />
              </li>
            ))}
          </ul>
        </div>
        {/* Activity feed */}
        <aside className='bg-gray-50 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5'>
          <header className='flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8'>
            <h2 className='text-base font-semibold leading-7'>Activity feed</h2>
            <a href='#' className='text-sm font-semibold leading-6 text-indigo-400'>
              View all
            </a>
          </header>
          <ul role='list' className='divide-y divide-white/5'>
            {activityItems.map(item => (
              <li key={item.commit} className='px-4 py-4 sm:px-6 lg:px-8'>
                <div className='flex items-center gap-x-3'>
                  <img src={item.user.imageUrl} alt='' className='h-6 w-6 flex-none rounded-full bg-gray-800' />
                  <h3 className='flex-auto truncate text-sm font-semibold leading-6'>{item.user.name}</h3>
                  <time dateTime={item.dateTime} className='flex-none text-xs text-gray-600'>
                    {item.date}
                  </time>
                </div>
                <p className='mt-3 truncate text-sm text-gray-500'>
                  Pushed to <span className='text-gray-400'>{item.projectName}</span> (
                  <span className='font-mono text-gray-400'>{item.commit}</span> on{' '}
                  <span className='text-gray-400'>{item.branch}</span>)
                </p>
              </li>
            ))}
          </ul>
        </aside>
      </Layout>
    </>
  )
}
