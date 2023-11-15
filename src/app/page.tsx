'use client'
import React from 'react'
import "../css/index.css"
import Link from 'next/link'
import DropDownMenu from "../components/DropdownMenu"
import { Languages } from '../types'
import { Dropdown } from 'react-bootstrap'
import { translatePage } from '../api/external/translate'

export default async function Initial() {
    const optionsArray = Object.keys(Languages);
    return (
        <body className='flex flex-col justify-between h-40 px-40'>
            <Link href='/cash-register'><div className='bg-gray-600 rounded-md text-white'>Cash Register</div></Link>
            <Link href='/manager-dashboard'><div className='bg-gray-600 rounded-md text-white'>Manager Dashboard</div></Link>
            <Link href='/kiosk'><div className='bg-gray-600 rounded-md text-white'>Customer Kiosk</div></Link>
            <Link href='/menu-board'><div className='bg-gray-600 rounded-md text-white'>Menu Board</div></Link>

            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Translate
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <DropDownMenu options={Languages} />
                </Dropdown.Menu>
            </Dropdown>
        </body>
    )
}
