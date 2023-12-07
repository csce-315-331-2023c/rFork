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

    const clazz = "w-full h-full flex flex-col justify-center items-center text-white text-4xl"

    return (
        <div className="h-screen w-screen">
            <div className='grid grid-rows-2 grid-cols-2 h-full w-full'>

                <Link href='/cash-register'><div className={`${clazz} bg-red-500`}>Cash Register</div></Link>
                <Link href='/manager-dashboard'><div className={`${clazz} bg-blue-500`}>Manager Dashboard</div></Link>
                <Link href='/kiosk'><div className={`${clazz} bg-yellow-500`}>Customer Kiosk</div></Link>
                <Link href='/menu-board'><div className={`${clazz} bg-green-500`}>Menu Board</div></Link>
            </div>
        </div>
    )
}
