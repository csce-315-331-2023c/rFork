'use client'
import React from 'react'
import "../css/index.css"
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.css'

/**
 * Initializes the four interfaces
 */
export default function Initial() {
    // const optionsArray = Object.keys(Languages);

    return (
        <div className="h-screen w-screen">
            <div className='grid grid-rows-2 grid-cols-2 h-full w-full'>

                <Link href='/cash-register'><div className={`w-full h-full flex flex-col justify-center items-center text-white text-4xl bg-red-500`}>Cash Register</div></Link>
                <Link href='/manager-dashboard'><div className={`w-full h-full flex flex-col justify-center items-center text-white text-4xl bg-blue-600`}>Manager Dashboard</div></Link>
                <Link href='/kiosk'><div className={`w-full h-full flex flex-col justify-center items-center text-black text-4xl bg-yellow-200`}>Customer Kiosk</div></Link>
                <Link href='/menu-board'><div className={`w-full h-full flex flex-col justify-center items-center text-black text-4xl bg-green-300`}>Menu Board</div></Link>
            </div>
        </div>
    )
}
