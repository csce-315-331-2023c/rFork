'use client'
import React, { useEffect, useState } from 'react'
import "../../css/index.css"
import KioskButton from '../../components/ImageButton'
import { MenuItem } from '../../types';

export default function Kiosk() {

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    useEffect(() => {
        const unsubscribe = () => {
            fetch("http://localhost:3000/api/menu").then(async (result) => {
                const allMenuItems = await result.json();
                setMenuItems(allMenuItems);
            });
        }
        return unsubscribe;
    }, []);

    return (
        <div className='flex-col'>
            {/* Navbar */}
            <div></div>
            {/* Slide Menus */}
            <div className='px-10'>
                <h1 className='text-4xl'>Items</h1>
                <div className='grid grid-cols-4 gap-4'>
                    {menuItems.map((menuItem, index) => (
                        <KioskButton
                            text={menuItem.name}
                            price={menuItem.price}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
