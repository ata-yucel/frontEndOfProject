



import React from 'react'
import { Link } from 'react-router-dom'

function Error404() {
  return (
    <div className='flex justify-center text-center'>
      <div>
        <p className='text-red-800 text-2xl'>Page Not Found</p>
        <div className='mt-10'>
          <Link to={"/"} className=' bg-green-600 text-white hover:bg-slate-600 rounded-full p-4' >Go to Home Page</Link>
        </div>
      </div>

    </div>
  )
}

export default Error404