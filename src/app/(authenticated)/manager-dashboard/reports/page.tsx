'use client'
import React, { useEffect, useState } from 'react'
import { product_usage, product_sales, product_excess, restock_report, sells_together } from '../../../../api/reports'
import "../../../../css/index.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthSessionHeader from '../../../../components/AuthSessionHeader';

export default function ReportView() {

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

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <div>
            <AuthSessionHeader />
            <div className="grid grid-cols-3 gap-4 p-4">
                <div className="flex flex-col items-start p-4">
                    <button aria-label="Product Usage" className="shadow-lg rounded-lg border-blue-300 border-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-16 px-4 rounded mb-2 w-full" onClick={() => {
                        fetch(`/api/reports?reports=product_usage&start=${startDate.getTime()}&end=${endDate.getTime()}`).then(res => res.json()).then(d => {
                            setData(d);
                            setReportType(r.product_usage);
                        })
                    }}>Product Usage</button>
                    <button aria-label="Product Sales" className="shadow-lg rounded-lg border-blue-300 border-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-16 px-4 rounded mb-2 w-full" onClick={() => {
                        fetch(`/api/reports?reports=product_sales&start=${startDate.getTime()}&end=${endDate.getTime()}`).then(res => res.json()).then(d => {
                            setData(d);
                            setReportType(r.product_sales);
                        })
                    }}>Product Sales</button>
                    <button aria-label="Product Excess" className="shadow-lg rounded-lg border-blue-300 border-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-16 px-4 rounded mb-2 w-full" onClick={() => {
                        fetch(`/api/reports?reports=product_excess&start=${startDate.getTime()}`).then(res => res.json()).then(d => {
                            setData(d);
                            setReportType(r.product_excess);
                        })
                    }}>Product Excess</button>
                    <button aria-label="Restock Report" className="shadow-lg rounded-lg border-blue-300 border-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-16 px-4 rounded mb-2 w-full" onClick={() => {
                        fetch(`/api/reports?reports=restock_report`).then(res => res.json()).then(d => {
                            setData(d);
                            setReportType(r.restock_report);
                        })
                    }}>Restock Report</button>
                    <button aria-label="Sells Together" className="shadow-lg rounded-lg border-blue-300 border-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-16 px-4 rounded mb-2 w-full" onClick={() => {
                        fetch(`/api/reports?reports=sells_together&start=${startDate.getTime()}&end=${endDate.getTime()}`).then(res => res.json()).then(d => {
                            setData(d);
                            setReportType(r.sells_together);
                        })
                    }}>Sells Together</button>
                </div>
                {
                    reportType == r.product_usage &&
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th className="bg-blue-100 border text-center px-8 py-4">Item ID</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4">Item Name</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4">Quantity Used</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((row, index) => {
                                        return (
                                            <tr key={`sales ${index}`}>
                                                <td className="border text-center px-8 py-4">{row.id}</td>
                                                <td className="border text-center px-8 py-4">{row.name}</td>
                                                <td className="border text-center px-8 py-4">{row.quantity}</td>
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
                                    <th className="bg-blue-100 border text-center px-8 py-4">Order ID</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4">Timestamp</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4">Order Total</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4">Submitted By</th>
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
                                    <th className="bg-blue-100 border text-center px-8 py-4">Item ID</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4">Item Name</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4">Current Stock</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4">Reorder Threshold</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((row, index) => {
                                        return (

                                            <tr key={`sales ${index}`}>
                                                <td className="border text-center px-8 py-4">{row.id}</td>
                                                <td className="border text-center px-8 py-4">{row.name}</td>
                                                <td className="border text-center px-8 py-4">{row.currentStock}</td>
                                                <td className="border text-center px-8 py-4">{row.reorderThreshold}</td>
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
                                    <th className="bg-blue-100 border text-center px-8 py-4">Item ID</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4">Item Name</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4">Current Stock</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4">Reorder Threshold</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((row, index) => {
                                        return (

                                            <tr key={`sales ${index}`}>
                                                <td className="border text-center px-8 py-4">{row.id}</td>
                                                <td className="border text-center px-8 py-4">{row.name}</td>
                                                <td className="border text-center px-8 py-4">{row.currentStock}</td>
                                                <td className="border text-center px-8 py-4">{row.reorderThreshold}</td>
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
                                    <th className="bg-blue-100 border text-center px-8 py-4">Item ID 1</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4">Item ID 2</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4">Number of Times Ordered Together</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((row, index) => {
                                        return (
                                            <tr key={`sales ${index}`}>
                                                <td className="border text-center px-8 py-4">{row.id1}</td>
                                                <td className="border text-center px-8 py-4">{row.id2}</td>
                                                <td className="border text-center px-8 py-4">{row.quantity}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                }
                <div className="flex flex-col">
                    <h2 className="text-left py-3 text-2xl">Start Date</h2>
                    <DatePicker isClearable placeholderText="Select Start Date" selected={startDate} onChange={(date) => setStartDate(date as Date)}>Start Date</DatePicker>
                    <h2 className="text-left py-3 pt-8 text-2xl">End Date</h2>
                    <DatePicker isClearable placeholderText="Select End Date" selected={endDate} onChange={(date) => setEndDate(date as Date)}>End Date</DatePicker>
                </div>
            </div>
        </div>
    )
}