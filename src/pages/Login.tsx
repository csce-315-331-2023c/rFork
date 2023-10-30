import React from 'react'
import "../css/index.css"
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col justify-between h-40 px-40'>
      <button className='bg-gray-600 rounded-md text-white' onClick={() => navigate("/cash-register")}>Cash Register</button>
      <button className='bg-gray-600 rounded-md text-white' onClick={() => navigate("/manager-dashboard")}>Manager Dashboard</button>
      <button className='bg-gray-600 rounded-md text-white' onClick={() => navigate("/kiosk")}>Customer Kiosk</button>
      <button className='bg-gray-600 rounded-md text-white' onClick={() => navigate("/menu-board")}>Menu Board</button>
    </div>
  )
}
