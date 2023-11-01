'use client'
import React, { useEffect, useState } from 'react'
import "../../css/index.css"
import KioskButton from '../../components/KioskButton'
import { MenuItem } from '../../types';

export default function MenuBoard() {

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
        <div>
            <a href="/">[Back button]</a>
            <header className='py-5'>
                MENU BOARD
            </header>
            <div>
                Here are the first 8 items:
                <div>{menuItems.slice(0,8).map((menuItem) => (
                        <KioskButton
                            text={menuItem.name}
                            price={menuItem.price}
                        />
                    ))}</div>
            </div>
        </div>
    )
}
