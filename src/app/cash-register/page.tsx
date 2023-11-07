'use client'
import React, { useEffect, useState } from 'react';
import "../../css/index.css";
import { MenuItem, Order } from '../../types';
import TextButton from '../../components/TextButton';
import PageLoading from '../../components/PageLoading';

export default function CashRegister() {
    // Data Hooks
    const [response, setResponse] = useState<string>("No Response");
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Component Constants
    const discountButtons = [
        (<TextButton text='-5%' key={0} />),
        (<TextButton text='-10%' key={1} />),
    ]

    const tipButtons = [
        (<TextButton text='5%' key={0} />),
        (<TextButton text='10%' key={1} />),
        (<TextButton text='15%' key={2} />),
    ]

    const defaultTopRightButtons = [
        (<TextButton
            text='Discounts'
            onPress={() => {
                setMiddleRightChildren(discountButtons);
                setBottomRightChildren(null);
            }}
            key={0}
        />),
        (<TextButton
            text='Tips'
            onPress={() => {
                setMiddleRightChildren(tipButtons);
                setBottomRightChildren(null);
            }}
            key={0}
        />),
    ]

    // Content Hooks
    const [topRightChildren, setTopRightChildren] = useState<React.JSX.Element[] | null>(defaultTopRightButtons);
    const [middleRightChildren, setMiddleRightChildren] = useState<React.JSX.Element[] | null>(null);
    const [bottomRightChildren, setBottomRightChildren] = useState<React.JSX.Element[] | null>(null);

    // Closure Functions
    useEffect(() => {
        (async function () {
            fetch("/api/menu").then(async (result) => {
                const allMenuItems = await result.json();
                if (allMenuItems && (typeof allMenuItems == 'object') && allMenuItems.constructor == Array) {
                    setMenuItems(allMenuItems);
                    const menuItemButtons = allMenuItems.map((menuItem: MenuItem) => {
                        return <TextButton text={menuItem.name} onPress={() => { }} />
                    });

                    setTopRightChildren([
                        (<TextButton text='Menu Items' onPress={() => setMiddleRightChildren(menuItemButtons)} />),
                        ...defaultTopRightButtons,
                    ])
                }
                else {
                    alert("An issue occured while attempting to fetch menu items from server.");
                }

                setLoading(false);
            });
        })();
    }, []);

    if (loading) return (<PageLoading />);

    // HTML Rendering
    return (
        <div className='flex flex-col h-screen'>
            {/* Header */}
            <nav className='h-10 bg-slate-300'></nav>
            <div className='grid grid-cols-3 grid-rows-3 flex-1 w-full'>
                {/* Left Side */}
                <div className='row-span-3 border-black border-r-2 flex flex-col'>
                    <div className='border-black border-b-2'>Order #</div>
                    <div className='flex-1 border-black border-b-2'></div>
                    <div className='grid grid-cols-2 grid-rows-2 p-2 gap-2 h-1/3'>
                        <div></div>
                        <ul>
                            <li>Subtotal:</li>
                            <li>Tax:</li>
                            <li>Tip:</li>
                            <li>Total:</li>
                        </ul>
                        <TextButton text='Cancel Order' />
                        <TextButton text='Pay' color='#3de8e0' />
                    </div>
                </div>
                {/* Right Side */}
                <div className='col-span-2 flex flex-col bg-white border-black border-b-2'>
                    <h2 className='text-center text-2xl underline'>Category</h2>
                    <div className='grid grid-cols-5 grid-rows-3 gap-2 px-4 py-2 flex-1'>
                        {topRightChildren}
                    </div>
                </div>
                <div className='col-span-2 flex flex-col bg-white border-black border-b-2'>
                    <h2 className='text-center text-2xl underline'>Options</h2>
                    <div className='grid grid-cols-5 grid-rows-3 gap-2 px-4 py-2 flex-1'>
                        {middleRightChildren}
                    </div>
                </div>
                <div className='col-span-2 flex flex-col bg-white border-black'>
                    <h2 className='text-center text-2xl underline'>Add-ons</h2>
                    <div className='grid grid-cols-5 grid-rows-3 gap-2 px-4 py-2 flex-1'>
                        {bottomRightChildren}
                    </div>
                </div>
            </div>

        </div>
    )
}
