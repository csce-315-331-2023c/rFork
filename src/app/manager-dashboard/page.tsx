'use client'
import React, { useEffect, useState } from 'react'
import "../../css/index.css"
import ImageButton from '../../components/ImageButton'
import { MenuItem } from '../../types';

export default function ManagerDashboard() {

    const [inventoryItems, setInventoryItems] = useState<MenuItem[]>([]);
    useEffect(() => {
        fetch("http://localhost:3000/api/inventory").then(async (result) => {
            const allMenuItems = await result.json();
            setInventoryItems(allMenuItems);
        });
    }, []);

    return (
        <div className='flex-col'>
            {/* Navbar */}
            <div></div>
            {/* Slide Menus */}
            <div className='px-10'>
                <h1 className='text-4xl'>Items</h1>
                <div className='grid grid-cols-4 gap-4'>
                    {
                        JSON.stringify(inventoryItems)
                    }
                </div>
            </div>
        </div>
    )
}
