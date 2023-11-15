'use client'
import React, { useEffect, useState } from 'react'
import "../../css/index.css"
import ImageButton from '../../components/ImageButton'
import TextButton from '../../components/TextButton';
import { MenuItem } from '../../types';
import PageLoading from '../../components/PageLoading';

export default function ManagerDashboard() {
    const [inventoryItems, setInventoryItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    //
    const viewButtons = [
        (<TextButton text='View Statistics' key={0} />),
        (<TextButton text='View Inventory' key={1} />),
        (<TextButton text='View Transactions' key={2} />),
    ]


    useEffect(() => {
        fetch("/api/inventory").then(async (result) => {
            const allMenuItems = await result.json();
            setInventoryItems(allMenuItems);
            setLoading(false);
        });
    }, []);

    if (loading) return <PageLoading />;
    return (
        <div className='flex flex-col h-screen'>
            {/* Header */}
            <nav className='h-10 bg-slate-300'></nav>
            <div className='grid grid-cols-2 grid-rows-1 flex-1 w-full'>
                {/* Left Side */}
                <div className='row-span-2 border-black border-r-2 flex flex-col'>
                <h2 className='text-center text-2xl border-black border-y-2'>Money/Management</h2>
                    <div className='flex-1'></div>
                    <h2 className='text-center text-2xl border-black border-y-2'>Employees</h2>
                    <div className='grid grid-cols-2 grid-rows-2 p-2 gap-2 h-1/3 border-black border-t-1'>
                 
                </div>
                    
                </div>
                {/* Right Side */}
                <div className='col-span-1 flex flex-col bg-white'>
                    <h2 className='text-center text-2xl border-black border-y-2'>Map</h2>
                </div>
            </div>

        </div>
    )

}
