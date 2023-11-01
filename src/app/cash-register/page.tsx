'use client'
import React, { useEffect, useState } from 'react'
import "../../css/index.css"
import { MenuItem, Order } from '../../types';

export default function CashRegister() {
    // Data Hooks
    const [response, setResponse] = useState("No Response");
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    // Content Hooks
    const [topRightMenu, setTopRightMenu] = useState<React.JSX.Element | null>(null);
    const [middleRightMenu, setMiddleRightMenu] = useState<React.JSX.Element | null>(null);
    const [bottomRightMenu, setBottomRightMenu] = useState<React.JSX.Element | null>(null);

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
        <body>
            <div className='grid grid-cols-3 grid-rows-3 h-screen w-full bg-red-500'>
                <div className='row-span-3 bg-blue-500'></div>
                <div className='col-span-2 flex-col bg-orange-400'>
                    <h2 className='text-center text-3xl'>Category</h2>
                    {topRightMenu}
                </div>
                <div className='col-span-2 flex-col bg-orange-500'>
                    <h2 className='text-center text-3xl'>Options</h2>
                    {middleRightMenu}
                </div>
                <div className='col-span-2 flex-col bg-orange-600'>
                    <h2 className='text-center text-3xl'>Add-ons</h2>
                    {bottomRightMenu}
                </div>
            </div>
            <button className='bg-black text-white' onClick={() => {
                const order = {
                    date: new Date(),
                    total: 100,
                    items: [
                        {
                            id: 1,
                            name: 'Cheeseburger',
                            price: 10,
                            ingredients: [
                                {
                                    inventoryId: 1,
                                    name: 'Bun',
                                    quantity: 1
                                },
                                {
                                    inventoryId: 2,
                                    name: 'Beef Patty',
                                    quantity: 1
                                },
                                {
                                    inventoryId: 3,
                                    name: 'Cheese',
                                    quantity: 1
                                }
                            ]
                        },
                        {
                            id: 2,
                            name: 'Fries',
                            price: 5,
                            ingredients: [
                                {
                                    inventoryId: 4,
                                    name: 'Potato',
                                    quantity: 1
                                }
                            ]
                        }
                    ]
                };

                fetch("http://localhost:3000/api/orders",
                    {
                        method: "POST",
                        body: JSON.stringify(order)
                    }
                ).then(async (res) => {
                    setResponse(await res.text())
                });

            }}>Create Order</button>
            <div>{response}</div>
            <div>{JSON.stringify(menuItems)}</div>
        </body>
    )
}
