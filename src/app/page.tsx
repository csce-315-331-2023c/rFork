'use client'
import React from 'react'
import "../css/index.css"
import Link from 'next/link'
import DropDownMenu from "../components/DropdownMenu"
import { Languages } from '../types'
import { Dropdown, Nav } from 'react-bootstrap'
import { translatePage } from '../api/translate'
import 'bootstrap/dist/css/bootstrap.css'

export default async function Initial() {
    // const optionsArray = Object.keys(Languages);

    const buttonStyle = {
        backgroundColor: "#4CAF50",
        border: "none",
        color: "white",
        textDecoration: "none",
        fontSize: "16px",
        cursor: "pointer"
    }

    return (
        <div className="h-screen w-screen">
            {/* <Dropdown className="w-full">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Translate
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <DropDownMenu options={Languages} />
                </Dropdown.Menu>
            </Dropdown> */}
            <div className='grid grid-rows-2 grid-cols-2 h-full w-full'>
                <Link href='/cash-register'><div style={buttonStyle}>Cash Register</div></Link>
                <Link href='/manager-dashboard'><div style={buttonStyle}>Manager Dashboard</div></Link>
                <Link href='/kiosk'><div style={buttonStyle}>Customer Kiosk</div></Link>
                <Link href='/menu-board'><div style={buttonStyle}>Menu Board</div></Link>
            </div>
        </div>
    )
}
