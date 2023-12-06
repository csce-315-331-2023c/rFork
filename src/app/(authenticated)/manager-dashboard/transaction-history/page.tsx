'use client'
import React, { useEffect, useState } from 'react'
import { getAll, getNotFinished } from '../../../../api/order'
import AuthSessionHeader from '../../../../components/AuthSessionHeader';
import "../../../../css/index.css"
import 'bootstrap/dist/css/bootstrap.css'
import Spinner from 'react-bootstrap/Spinner';

export default function TranscationHistory() {
    enum t {
        getAll,
        getNotFinished
    }

    const [historyType, setHistoryType] = useState(t.getAll)
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('/api/orders?history=getNotFinished').then(res => res.json()).then(d => {
            setLoading(false);
            setData(d);
        })
    }, []);

    const [data, setData] = useState<Array<any>>([]);

    return (
        <div>
            <AuthSessionHeader />
            <div className="grid grid-cols-2 gap-4 p-4">
                <div className="flex flex-col items-start p-4">
                <button aria-label="Get In Flight Orders" className="shadow-lg rouded-lg border-blue-300 border-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-16 px-4 rounded mb-2 w-full" onClick={() => {
                        setLoading(true);
                        fetch(`/api/orders?history=getNotFinished`).then(res => res.json()).then(d => {
                            setLoading(false);
                            setData(d);
                            setHistoryType(t.getNotFinished);
                        })
                }}>Get In Flight Orders</button>
                    <button aria-label="Get All Orders" className="shadow-lg rounded-lg border-blue-300 border-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-16 px-4 rounded mb-2 w-full" onClick={() => {
                        setLoading(true);
                        fetch(`/api/orders?history=getAll`).then(res => res.json()).then(d => {
                            setLoading(false);
                            setData(d);
                            setHistoryType(t.getAll);
                        })
                    }}>Get All Orders</button>
                </div>
                {
                    loading &&
                    <div className="flex flex-col items-center p-4">
                        <Spinner animation="border" role="status" className="item-center w-full">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        Loading...
                    </div>
                }
                {
                    historyType == t.getAll && !loading &&

                    <table>
                        <thead>
                            <tr>
                                <th className="bg-blue-100 border text-center px-8 py-4">Order ID</th>
                                <th className="bg-blue-100 border text-center px-8 py-4">Order Time</th>
                                <th className="bg-blue-100 border text-center px-8 py-4">Order Total</th>
                                <th className="bg-blue-100 border text-center px-8 py-4">Submitted By</th>
                                <th className="bg-blue-100 border text-center px-8 py-4">Order Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((row, index) => {
                                    return (
                                        <tr key={`sales ${index}`}>
                                            <td className="border text-center px-8 py-4">{row.id}</td>
                                            <td className="border text-center px-8 py-4">{row.timestamp}</td>
                                            <td className="border text-center px-8 py-4">{`\$${row.total.toFixed(2)}`}</td>
                                            <td className="border text-center px-8 py-4">{row.submittedBy}</td>
                                            <td className="border text-center px-8 py-4">{row.isFinished?`Complete`:`In Flight`}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                }
                {
                    historyType == t.getNotFinished && !loading &&

                    <table>
                        <thead>
                            <tr>
                                <th className="bg-blue-100 border text-center px-8 py-4">Order ID</th>
                                <th className="bg-blue-100 border text-center px-8 py-4">Order Time</th>
                                <th className="bg-blue-100 border text-center px-8 py-4">Order Total</th>
                                <th className="bg-blue-100 border text-center px-8 py-4">Submitted By</th>
                                <th className="bg-blue-100 border text-center px-8 py-4">Order Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((row, index) => {
                                    return (
                                        <tr key={`sales ${index}`}>
                                            <td className="border text-center px-8 py-4">{row.id}</td>
                                            <td className="border text-center px-8 py-4">{row.timestamp}</td>
                                            <td className="border text-center px-8 py-4">{`\$${row.total.toFixed(2)}`}</td>
                                            <td className="border text-center px-8 py-4">{row.submittedBy}</td>
                                            <td className="border text-center px-8 py-4">{row.isFinished?`Complete`:`In Flight`}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}