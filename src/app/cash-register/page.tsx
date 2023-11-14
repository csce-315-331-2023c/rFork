'use client'
import React, { useEffect, useState } from 'react';
import "../../css/index.css";
import { MenuItem, Order } from '../../types';
import TextButton from '../../components/TextButton';
import PageLoading from '../../components/PageLoading';

export default function CashRegister() {
    // Data Hooks
    const [loading, setLoading] = useState<boolean>(true);

    const [subtotal, setSubtotal] = useState<number>(0);
    const [tax, setTax] = useState<number>(0);
    const [tip, setTip] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    const [middleRightChildren, setMiddleRightChildren] = useState<React.JSX.Element[] | null>(null);
    const [bottomRightChildren, setBottomRightChildren] = useState<React.JSX.Element[] | null>(null);

    // Component Constants
    const discountButtons = [
        (<TextButton text='-5%' key={0} />),
        (<TextButton text='-10%' key={1} />),
    ];

    const tipButtons = [
        (<TextButton text='5%' key={0} />),
        (<TextButton text='10%' key={1} />),
        (<TextButton text='15%' key={2} />),
    ];
    // Closure Functions
    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) return (<PageLoading />);

    // HTML Rendering
    return (
        <div className='flex flex-col h-screen'>
            {/* Header */}
            <nav className='h-10 bg-slate-300'></nav>
            <div className='grid grid-cols-3 grid-rows-3 flex-1 w-full'>
                {/* Left Side */}
                <div className='row-span-3 border-gray-500 border-r-2 flex flex-col'>
                    <div className='border-gray-500 border-y-2'>Order #</div>
                    <div className='flex-1'></div>
                    <div className='grid grid-cols-2 grid-rows-2 p-2 gap-2 h-1/3 border-gray-500 border-t-2'>
                        <div></div>
                        <div className='flex flex-row justify-between px-10'>
                            <ul>
                                <li>Subtotal:</li>
                                <li>Tax:</li>
                                <li>Tip:</li>
                                <li>Total:</li>
                            </ul>
                            <ul>
                                <li>{`\$${subtotal.toFixed(2)}`}</li>
                                <li>{`\$${tax.toFixed(2)}`}</li>
                                <li>{`\$${tip.toFixed(2)}`}</li>
                                <li>{`\$${total.toFixed(2)}`}</li>
                            </ul>
                        </div>
                        <TextButton text='Cancel Order' />
                        <TextButton text='Pay' color='#3de8e0' />
                    </div>
                </div>
                {/* Right Side */}
                <div className='col-span-2 flex flex-col bg-white'>
                    <h2 className='text-center text-2xl border-gray-500 border-y-2'>Category</h2>
                    <div className='grid grid-cols-5 grid-rows-3 gap-2 px-4 py-2 flex-1'>
                        <TextButton
                            text='Sweet Crepes'
                            onPress={() => {
                                setMiddleRightChildren(null);
                                setBottomRightChildren(null);
                            }}
                            key={"sweetCrepeButton"}
                        />
                        <TextButton
                            text='Savory Crepes'
                            onPress={() => {
                                setMiddleRightChildren(null);
                                setBottomRightChildren(null);
                            }}
                            key={"savoryCrepeButton"}
                        />
                        <TextButton
                            text='Waffles'
                            onPress={() => {
                                setMiddleRightChildren(null);
                                setBottomRightChildren(null);
                            }}
                            key={"waffleButton"}
                        />
                        <TextButton
                            text='Soups'
                            onPress={() => {
                                setMiddleRightChildren(null);
                                setBottomRightChildren(null);
                            }}
                            key={"soupsButton"}
                        />
                        <TextButton
                            text='Drinks'
                            onPress={() => {
                                setMiddleRightChildren(null);
                                setBottomRightChildren(null);
                            }}
                            key={"drinkButton"}
                        />
                        <TextButton
                            text='Discounts'
                            onPress={() => {
                                setMiddleRightChildren(discountButtons);
                                setBottomRightChildren(null);
                            }}
                            key={"discountButton"}
                        />
                        <TextButton
                            text='Tips'
                            onPress={() => {
                                setMiddleRightChildren(tipButtons);
                                setBottomRightChildren(null);
                            }}
                            key={"tipButton"}
                        />
                    </div>
                </div>
                <div className='col-span-2 flex flex-col bg-white'>
                    <h2 className='text-center text-2xl border-gray-500 border-y-2'>Options</h2>
                    <div className='grid grid-cols-5 grid-rows-3 gap-2 px-4 py-2 flex-1'>
                        {middleRightChildren}
                    </div>
                </div>
                <div className='col-span-2 flex flex-col bg-white'>
                    <h2 className='text-center text-2xl border-gray-500 border-y-2'>Add-ons</h2>
                    <div className='grid grid-cols-5 grid-rows-3 gap-2 px-4 py-2 flex-1'>
                        {bottomRightChildren}
                    </div>
                </div>
            </div>

        </div>
    )
}
