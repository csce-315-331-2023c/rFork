'use client'
import React, { useState } from 'react'
import "../../css/index.css"
import { Order } from '../../types';

export default function CashRegister() {
    const [response, setResponse] = useState("No Response");

    return (
        <div>
            <button className='bg-black text-white' onClick={() => {
                const order: any = {
                    date: 0,
                    item: [],
                    total: 0,
                }
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
        </div>
    )
}
