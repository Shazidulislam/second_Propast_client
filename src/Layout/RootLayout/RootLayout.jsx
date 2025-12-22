import React from 'react'
import { Outlet } from 'react-router'

const RootLayout = () => {
  return (
    <div>
      <nav>This is Nav item</nav>
      <main>
        <Outlet/>
      </main>
      <footer>
        <h1 className='text-2xl'>This is Footer</h1>
      </footer>
    </div>
  )
}

export default RootLayout
