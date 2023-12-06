'use client'
import React, { useEffect, useState } from 'react'
import "../../../css/index.css"
import ImageButton from '../../../components/ImageButton';
import PageLoading from '../../../components/PageLoading';
import Link from 'next/link';
import TextButton from '../../../components/TextButton';
import AuthSessionHeader from '../../../components/AuthSessionHeader';
import { signIn, signOut, useSession } from "next-auth/react";
import { rSession } from '../../../types';

export default function ManagerDashboard() {
    const [loading, setLoading] = useState<boolean>(true);
    const { data: session, status } = useSession();

    useEffect(() => {
        setLoading(false);
    }, []);

    useEffect(() => {
        console.log(session?.user);
        if (session && (session as rSession)?.user?.employee?.role !== "manager") {
            signOut({ callbackUrl: '/unauthorized' });
        }
    }, [session, status]);

    if (loading) return <PageLoading />;

    return (
        <div className='flex flex-col h-screen'>
            <AuthSessionHeader />
            {/* Slide Menus */}
            <div className='grid grid-rows-2 grid-cols-2 flex-1'>
                <div className='grid grid-cols-4 bg-white row-span-1 col-span-1 p-2 gap-2'>
                    <Link href='/manager-dashboard/reports'>
                        <ImageButton
                            imageURI='https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/3162988/chart-clipart-md.png'
                            customClassName='flex-1 flex flex-col items-center justify-center border-[#888] border-2 h-full'
                            color='#FFF'
                            hoverColor='#CCC'
                            altText='View Statistics Button Image'
                        />
                    </Link>
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
                    <Link href='/manager-dashboard/transaction-history'>
                    <ImageButton
                        imageURI='https://cdn-icons-png.flaticon.com/512/8118/8118496.png'
                        customClassName='flex-1 flex flex-col h-full w-full items-center justify-center border-[#888] border-2'
                        color='#FFF'
                        hoverColor='#CCC'
                        altText='View Transaction History Button Image'
                    />
                    </Link>
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
