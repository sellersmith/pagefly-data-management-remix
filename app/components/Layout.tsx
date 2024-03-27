import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import MobileSidebar from './MobileSidebar'

export default function Layout({ children }: React.PropsWithChildren<{ children: React.ReactNode }>) {
  return (
    <div>
      <MobileSidebar />

      {/* Static sidebar for desktop */}
      <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <Sidebar />
      </div>

      <div className='lg:pl-72'>
        <Header />

        <main className='py-10'>
          <div className='px-4 sm:px-6 lg:px-8'>{children}</div>
        </main>
      </div>
    </div>
  )
}
