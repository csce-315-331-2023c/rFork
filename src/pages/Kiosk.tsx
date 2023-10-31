import React from 'react'
import "../css/index.css"
import KioskButton from '../components/KioskButton'

export default function Kiosk() {
  return (
    <div className='flex-col'>
      {/* Navbar */}
      <div></div>
      {/* Slide Menus */}
      <div className='px-10'>
        <h1 className=' text-4xl'>Crepes</h1>
        <div className='grid grid-cols-2 gap-4'>
          <KioskButton text='asdf' />
        </div>
      </div>
    </div>
  )
}
