'use client'
import React, { useEffect, useState } from 'react'
import "../../css/index.css"
import KioskButton from '../../components/KioskButton'
import { MenuItem } from '../../types';

export default function Kiosk() {

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/menu-items").then((result) => console.log(result));
        const fakeData: MenuItem[] = [
            {
                id: 0,
                name: "Crepe",
                price: 100,
                ingredients: []
            },
            {
                id: 0,
                name: "Strawberry Crepe",
                price: 200,
                ingredients: []
            },
            {
                id: 0,
                name: "Lemon Crepe",
                price: 100,
                ingredients: []
            },
            {
                id: 0,
                name: "Chicken Enchilada",
                price: 100,
                ingredients: []
            },
        ];

        setMenuItems(fakeData);
    }, []);

    return (
        <div className='flex-col'>
            {/* Navbar */}
            <div></div>
            {/* Slide Menus */}
            <div className='px-10'>
                <h1 className='text-4xl'>Items</h1>
                <div className='grid grid-cols-4 gap-4'>
                    {menuItems.map((menuItem) => (
                        <KioskButton
                            text={menuItem.name}
                            price={menuItem.price}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
