import React from 'react'
import { Outlet } from 'react-router'

export const AdminLayout = () => {
  return (
    <div className='bg-indigo-400'>

        <Outlet />

    </div>
  )
}
