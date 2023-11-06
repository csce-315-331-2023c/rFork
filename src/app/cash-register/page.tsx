'use client'
import React, { useEffect, useState } from 'react';
import "../../css/index.css";
import { MenuItem, Order } from '../../types';
import TextButton from '../../components/TextButton';

export default function CashRegister() {
    // Data Hooks
    const [response, setResponse] = useState("No Response");
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    // Content Hooks
    const [topRightChildren, setTopRightChildren] = useState<React.JSX.Element[] | null>(null);
    const [middleRightChildren, setMiddleRightChildren] = useState<React.JSX.Element[] | null>(null);
    const [bottomRightChildren, setBottomRightChildren] = useState<React.JSX.Element[] | null>(null);

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

    // Closure Functions
    useEffect(() => {
        setTopRightChildren(defaultTopRightButtons)

        const unsubscribe = () => {
            fetch("http://localhost:3000/api/menu").then(async (result) => {
                const allMenuItems = await result.json();
                setMenuItems(allMenuItems);
            });
        }
        return unsubscribe;
    }, []);

    // HTML Rendering
    return (
        <div className='flex flex-col h-screen'>
            <nav className='h-10 bg-slate-300'></nav>
            <div className='grid grid-cols-3 grid-rows-3 flex-1 w-full'>
                <div className='row-span-3 border-black border-r-2'></div>
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
