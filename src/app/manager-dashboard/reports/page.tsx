'use client'
import React, { useEffect, useState } from 'react'
import { product_usage, product_sales, product_excess, restock_report, sells_together } from '../../../api/reports'
import "../../../css/index.css"

export default function reportView() {

    enum r {
        product_usage,
        product_sales,
        product_excess,
        restock_report,
        sells_together
    }

    const [reportType, setReportType] = useState<r>(r.product_usage);

    useEffect(() => {
        fetch('/api/reports?reports=product_usage&start=0&end=1701660672190').then(res => res.json()).then(d => {
            setData(d);
        })
    }, []);

    const [data, setData] = useState<Array<any>>([]);
    return (

        <div className="justify-center h-screen">
            <button className="bg-gray-100 p-8 border-red-800 border-8" onClick={() => {
                fetch('/api/reports?reports=product_usage&start=0&end=1701660672190').then(res => res.json()).then(d => {
                    setData(d);
                    setReportType(r.product_usage);
                })
            }}>Product Usage</button>
            <button className="bg-gray-100 p-8 border-red-800 border-8" onClick={() => {
                fetch('/api/reports?reports=product_sales&start=0&end=1701660672190').then(res => res.json()).then(d => {
                    setData(d);
                    setReportType(r.product_sales);
                })
            }}>Product Sales</button>
            <button className="bg-gray-100 p-8 border-red-800 border-8" onClick={() => {
                fetch('/api/reports?reports=product_excess&start=0').then(res => res.json()).then(d => {
                    setData(d);
                    setReportType(r.product_excess);
                })
            }}>Product Excess</button>
            <button className="bg-gray-100 p-8 border-red-800 border-8" onClick={() => {
                fetch('/api/reports?reports=restock_report').then(res => res.json()).then(d => {
                    setData(d);
                    setReportType(r.restock_report);
                })
            }}>Restock Report</button>
            <button className="bg-gray-100 p-8 border-red-800 border-8" onClick={() => {
                fetch('/api/reports?reports=sells_together&start=0&end=1701660672190').then(res => res.json()).then(d => {
                    setData(d);
                    setReportType(r.sells_together);
                })
            }}>Sells Together</button>
            {
                reportType == r.product_usage &&
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th className='px-10'>Item ID</th>
                                <th className='px-10'>Item Name</th>
                                <th className='px-10'>Quantity Used</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((row, index) => {
                                    return (
                                        <tr key={`sales ${index}`}>
                                            <td className='px-10'>{row.id}</td>
                                            <td className='px-10'>{row.name}</td>
                                            <td className='px-10'>{row.quantity}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
            {
                reportType == r.product_sales &&
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th className='px-10'>Order ID</th>
                                <th className='px-10'>Timestamp</th>
                                <th className='px-10'>Order Total</th>
                                <th className='px-10'>Submitted By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((row, index) => {
                                    return (
                                        <tr key={`sales ${index}`}>
                                            <td className='px-10'>{row.id}</td>
                                            <td className='px-10'>{row.timestamp}</td>
                                            <td className='px-10'>{`\$${row.total.toFixed(2)}`}</td>
                                            <td className='px-10'>{row.submittedBy}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
            {
                reportType == r.product_excess &&
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th className='px-10'>Item ID</th>
                                <th className='px-10'>Item Name</th>
                                <th className='px-10'>Current Stock</th>
                                <th className='px-10'>Reorder Threshold</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((row, index) => {
                                    return (

                                        <tr key={`sales ${index}`}>
                                            <td className='px-10'>{row.id}</td>
                                            <td className='px-10'>{row.name}</td>
                                            <td className='px-10'>{row.currentStock}</td>
                                            <td className='px-10'>{row.reorderThreshold}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
            {
                reportType == r.restock_report &&
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th className='px-10'>Item ID</th>
                                <th className='px-10'>Item Name</th>
                                <th className='px-10'>Current Stock</th>
                                <th className='px-10'>Reorder Threshold</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((row, index) => {
                                    return (

                                        <tr key={`sales ${index}`}>
                                            <td className='px-10'>{row.id}</td>
                                            <td className='px-10'>{row.name}</td>
                                            <td className='px-10'>{row.currentStock}</td>
                                            <td className='px-10'>{row.reorderThreshold}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
            {
                reportType == r.sells_together &&
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th className='px-10'>Item ID 1</th>
                                <th className='px-10'>Item ID 2</th>
                                <th className='px-10'>Number of Times Ordered Together</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((row, index) => {
                                    return (
                                        <tr key={`sales ${index}`}>
                                            <td className='px-10'>{row.id1}</td>
                                            <td className='px-10'>{row.id2}</td>
                                            <td className='px-10'>{row.quantity}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}