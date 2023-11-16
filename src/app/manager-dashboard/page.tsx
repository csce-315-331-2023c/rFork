'use client'
import React, { useEffect, useState } from 'react'
import "../../css/index.css"
import ImageButton from '../../components/ImageButton'
import TextButton from '../../components/TextButton';
import { MenuItem } from '../../types';
import PageLoading from '../../components/PageLoading';
import Link from 'next/link';
import TextButton from '../../components/TextButton';

export default function ManagerDashboard() {
    const [loading, setLoading] = useState<boolean>(true);
    
    //
    const viewButtons = [
        (<TextButton text='View Statistics' key={0} />),
        (<TextButton text='View Inventory' key={1} />),
        (<TextButton text='View Transactions' key={2} />),
    ]


    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) return <PageLoading />;
    return (
        <div className='flex flex-col h-screen'>
            {/* Header */}
            <nav className='h-10 bg-slate-300'>
                <Link href='/'>
                    <TextButton text='Logout' customClassName='a' color='#DD3311' hoverColor='#FF3311' />
                </Link>
            </nav>
            {/* Slide Menus */}
            <div className='grid grid-rows-2 grid-cols-2 flex-1'>
                <div className='grid grid-cols-4 bg-white row-span-1 col-span-1 p-2 gap-2'>
                    <ImageButton
                        imageURI='https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/3162988/chart-clipart-md.png'
                        customClassName='flex-1 flex flex-col items-center justify-center border-[#888] border-2'
                        color='#FFF'
                        hoverColor='#CCC'
                        altText='View Statistics Button Image'
                    />
                    <Link href='/manager-dashboard/inventory-items'>
                        <ImageButton
                            imageURI='https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/35909/cardboard-box-clipart-xl.png'
                            customClassName='flex-1 flex flex-col items-center justify-center border-[#888] border-2 h-full'
                            color='#FFF'
                            hoverColor='#CCC'
                            altText='View Inventory Items Button Image'
                        />
                    </Link>
                    <ImageButton
                        imageURI='https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/37528/menu-restaurant-clipart-xl.png'
                        customClassName='flex-1 flex flex-col items-center justify-center border-[#888] border-2'
                        color='#FFF'
                        hoverColor='#CCC'
                        altText='View Menu Items Button Image'
                    />
                    <ImageButton
                        imageURI='https://cdn-icons-png.flaticon.com/512/8118/8118496.png'
                        customClassName='flex-1 flex flex-col items-center justify-center border-[#888] border-2'
                        color='#FFF'
                        hoverColor='#CCC'
                        altText='View Transaction History Button Image'
                    />
                    <p className='text-center text-lg'>View Statistics</p>
                    <p className='text-center text-lg'>Inventory Items</p>
                    <p className='text-center text-lg'>Menu Items</p>
                    <p className='text-center text-lg'>Transaction History</p>
                </div>
                <div className='bg-black row-span-2 col-span-1'></div>
                <div className='bg-red-500 row-span-1 col-span-1'></div>
            </div>

        </div>
    )

}
