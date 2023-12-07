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
import { getEmployees } from '../../../api/employee';

export default function ManagerDashboard() {
    const [loading, setLoading] = useState<boolean>(true);
    const { data: session, status } = useSession();
    const [employee, setEmployee] = useState<Array<any>>([]);

    useEffect(() => {
        setLoading(false);
    }, []);

    useEffect(() => {
        console.log(session?.user);
        if (session && (session as rSession)?.user?.employee?.role !== "manager") {
            signOut({ callbackUrl: '/unauthorized' });
        }
    }, [session, status]);

    useEffect(() => {
        fetch('/api/employees').then(res => res.json()).then(d => {
            setLoading(false);
            setEmployee(d);
        })
    }, []);

    if (loading) return <PageLoading />;

    return (
        <div className='flex flex-col h-screen'>
            <AuthSessionHeader />
            {/* Slide Menus */}
            <div className='grid grid-rows-2 grid-cols-2 flex-1 h-full'>
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
                    <Link href='/manager-dashboard/menu-items'>
                        <ImageButton
                            imageURI='https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/37528/menu-restaurant-clipart-xl.png'
                            customClassName='flex-1 flex flex-col items-center justify-center border-[#888] border-2 h-full w-full'
                            color='#FFF'
                            hoverColor='#CCC'
                            altText='View Inventory Items Button Image'
                        />
                    </Link>
                    <Link href='/manager-dashboard/transaction-history'>
                        <ImageButton
                            imageURI='https://cdn-icons-png.flaticon.com/512/8118/8118496.png'
                            customClassName='flex-1 flex flex-col h-full w-full items-center justify-center border-[#888] border-2'
                            color='#FFF'
                            hoverColor='#CCC'
                            altText='View Transaction History Button Image'
                        />
                    </Link>
                    <p className='text-center text-lg' id='google-translate-element'>View Statistics</p>
                    <p className='text-center text-lg' id='google-translate-element'>Inventory Items</p>
                    <p className='text-center text-lg' id='google-translate-element'>Menu Items</p>
                    <p className='text-center text-lg' id='google-translate-element'>Transaction History</p>
                </div>
                <div className='row-span-2 col-span-1 flex flex-col justify-center items-center h-full w-full border-black border-l-2'>
                    <img src='https://images-ext-2.discordapp.net/external/qF9d_Cke88lBsSweSYIeXSnOPfPFe6JPppS26D2_OvA/https/mma.prnewswire.com/media/2032861/Sweet_Paris_Logo.jpg?format=webp&width=421&height=500' />
                </div>
                <div className='bg-gray-300 row-span-1 col-span-1 overflow-y-auto h-full'>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="bg-blue-100 border text-center px-8 py-4" aria-descrpiton="Column for Employee ID" id='google-translate-element'>Employee ID</th>
                                <th className="bg-blue-100 border text-center px-8 py-4" aria-descrpiton="Column for Employee First Name" id='google-translate-element'>Employee First Name</th>
                                <th className="bg-blue-100 border text-center px-8 py-4" aria-descrpiton="Column for Employee Last Name" id='google-translate-element'>Employee Last Name</th>
                                <th className="bg-blue-100 border text-center px-8 py-4" aria-descrpiton="Column for Employee Role" id='google-translate-element'>Employee Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employee.map((row, index) => {
                                    return (
                                        <tr key={`sales ${index}`}>
                                            <td className="border text-center px-8 py-4">{row.id}</td>
                                            <td className="border text-center px-8 py-4">{row.firstName}</td>
                                            <td className="border text-center px-8 py-4">{row.lastName}</td>
                                            <td className="border text-center px-8 py-4">{row.role}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
