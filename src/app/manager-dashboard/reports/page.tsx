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
        fetch('/api/reports?reports=product_usage').then(res => res.json()).then(d => {
            setData(d);
        })
    }, []);

    const [data, setData] = useState<Array<any>>([]);
    console.log(data);
    return (

        <div className="justify-center h-screen">
            <button className="bg-gray-100 p-8 border-red-800 border-8" onClick={() => setReportType(r.product_usage)}>Product Usage</button>
            <button className="bg-gray-100 p-8 border-red-800 border-8" onClick={() => {
                setReportType(r.product_sales);
                fetch('/api/reports?reports=product_sales&start=0&end=1701660672190').then(res => res.json()).then(d => {
                    setData(d);
                })
            }}>Product Sales</button>
            <button className="bg-gray-100 p-8 border-red-800 border-8" onClick={() => setReportType(r.product_excess)}>Product Excess</button>
            <button className="bg-gray-100 p-8 border-red-800 border-8" onClick={() => setReportType(r.restock_report)}>Restock Report</button>
            <button className="bg-gray-100 p-8 border-red-800 border-8" onClick={() => setReportType(r.sells_together)}>Sells Together</button>
            {
                reportType == r.product_usage &&
                <div>
                    <table>
                        <thead>
                            <tr>

                            </tr>
                        </thead>
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
                </div>
            }
            {
                reportType == r.restock_report &&
                <div>
                </div>
            }
            {
                reportType == r.sells_together &&
                <div>
                </div>
            }
        </div>
    )
}