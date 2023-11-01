'use client'
import React, { useEffect, useState } from 'react'
import "../../css/index.css"
import { MenuItem, Order } from '../../types';

export default function CashRegister() {
    const [response, setResponse] = useState("No Response");
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
        </div>
    )
}
