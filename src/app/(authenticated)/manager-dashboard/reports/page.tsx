'use client'
import React, { useEffect, useState } from 'react'
import { product_usage, product_sales, product_excess, restock_report, sells_together } from '../../../../api/reports'
import "../../../../css/index.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthSessionHeader from '../../../../components/AuthSessionHeader';
import 'bootstrap/dist/css/bootstrap.css'
import Spinner from 'react-bootstrap/Spinner';

export default function ReportView() {

    enum r {
        product_usage,
        product_sales,
        product_excess,
        restock_report,
        sells_together
    }

    const [reportType, setReportType] = useState<r>(r.product_usage);
    const [loading, setLoading] = useState<boolean>(true);
    const [empty, setEmpty] = useState<boolean>(false);

    useEffect(() => {
        fetch('/api/reports?reports=product_usage&start=0&end=1701660672190').then(res => res.json()).then(d => {
            setLoading(false);
            setData(d);
            setEmpty(d.length == 0);
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
                        setLoading(true);
                        fetch(`/api/reports?reports=product_usage&start=${startDate.getTime()}&end=${endDate.getTime()}`).then(res => res.json()).then(d => {
                            setLoading(false);
                            setData(d);
                            setEmpty(d.length == 0);
                            setReportType(r.product_usage);
                        })
                    }}>Product Usage</button>
                    <button aria-label="Product Sales" className="shadow-lg rounded-lg border-blue-300 border-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-16 px-4 rounded mb-2 w-full" onClick={() => {
                        setLoading(true);
                        fetch(`/api/reports?reports=product_sales&start=${startDate.getTime()}&end=${endDate.getTime()}`).then(res => res.json()).then(d => {
                            setLoading(false);
                            setData(d);
                            setEmpty(d.length == 0);
                            setReportType(r.product_sales);
                        })
                    }}>Product Sales</button>
                    <button aria-label="Product Excess" className="shadow-lg rounded-lg border-blue-300 border-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-16 px-4 rounded mb-2 w-full" onClick={() => {
                        setLoading(true);
                        fetch(`/api/reports?reports=product_excess&start=${startDate.getTime()}`).then(res => res.json()).then(d => {
                            setLoading(false);
                            setData(d);
                            setEmpty(d.length == 0);
                            setReportType(r.product_excess);
                        })
                    }}>Product Excess</button>
                    <button aria-label="Restock Report" className="shadow-lg rounded-lg border-blue-300 border-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-16 px-4 rounded mb-2 w-full" onClick={() => {
                        setLoading(true);
                        fetch(`/api/reports?reports=restock_report`).then(res => res.json()).then(d => {
                            setLoading(false);
                            setData(d);
                            setEmpty(d.length == 0);
                            setReportType(r.restock_report);
                        })
                    }}>Restock Report</button>
                    <button aria-label="Sells Together" className="shadow-lg rounded-lg border-blue-300 border-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-16 px-4 rounded mb-2 w-full" onClick={() => {
                        setLoading(true);
                        fetch(`/api/reports?reports=sells_together&start=${startDate.getTime()}&end=${endDate.getTime()}`).then(res => res.json()).then(d => {
                            setLoading(false);
                            setData(d);
                            setEmpty(d.length == 0);
                            setReportType(r.sells_together);
                        })
                    }}>Sells Together</button>
                </div>
                {
                    empty &&
                    <div className="flex flex-col items-center p-4">
                        No Data
                    </div>
                }
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
                    reportType == r.product_usage && !empty && !loading &&
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th className="bg-blue-100 border text-center px-8 py-4" aria-descrpiton="Column for Item ID">Item ID</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4" aria-descrpiton="Column for Item Name">Item Name</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4" aria-descrpiton="Column for Quantity Used">Quantity Used</th>
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
                    reportType == r.product_sales && !empty && !loading &&
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th className="bg-blue-100 border text-center px-8 py-4" aria-descrpiton="Column for Order ID">Order ID</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4" aria-descrpiton="Column for Timestamp">Timestamp</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4" aria-descrpiton="Column for Order Total">Order Total</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4" aria-descrpiton="Column for Submitted By">Submitted By</th>
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
                    reportType == r.product_excess && !empty && !loading &&
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th className="bg-blue-100 border text-center px-8 py-4" aria-descrpiton="Column for Item ID">Item ID</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4" aria-descrpiton="Column for Item Name">Item Name</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4" aria-descrpiton="Column for Current Stock">Current Stock</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4" aria-descrpiton="Column for Reorder Threshold">Reorder Threshold</th>
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
                    reportType == r.restock_report && !empty && !loading &&
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th className="bg-blue-100 border text-center px-8 py-4" aria-descrpiton="Column for Item ID">Item ID</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4" aria-descrpiton="Column for Item Name">Item Name</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4" aria-descrpiton="Column for Current Stock">Current Stock</th>
                                    <th className="bg-blue-100 border text-center px-8 py-4" aria-descrpiton="Column for Reorder Threshold">Reorder Threshold</th>
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
                    reportType == r.sells_together && !empty && !loading &&
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th className="bg-blue-100 border text-center px-4 py-4" aria-descrpiton="Column for Item ID 1">Item ID 1</th>
                                    <th className="bg-blue-100 border text-center px-4 py-4" aria-descrpiton="Column for Item ID 2">Item ID 2</th>
                                    <th className="bg-blue-100 border text-center px-4 py-4" aria-descrpiton="Column for Item Name 1">Item Name 1</th>
                                    <th className="bg-blue-100 border text-center px-4 py-4" aria-descrpiton="Column for item Name2">Item Name 2</th>
                                    <th className="bg-blue-100 border text-center px-4 py-4" aria-descrpiton="Column for Number of Times Ordered Together">Number of Times Ordered Together</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((row, index) => {
                                        return (
                                            <tr key={`sales ${index}`}>
                                                <td className="border text-center px-8 py-4">{row.id1}</td>
                                                <td className="border text-center px-8 py-4">{row.id2}</td>
                                                <td className="border text-center px-8 py-4">{row.name1}</td>
                                                <td className="border text-center px-8 py-4">{row.name2}</td>
                                                <td className="border text-center px-8 py-4">{row.quantity}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                }
                { (reportType == r.product_usage || reportType == r.product_sales || reportType == r.product_excess ||reportType == r.sells_together) && 
                    <div className="flex flex-col items-center">
                        <div className="w-full">
                            <h2 className="text-left py-3 text-2xl">Start Date</h2>
                            <DatePicker isClearable placeholderText="Select Start Date" selected={startDate} onChange={(date) => setStartDate(date as Date)}>Start Date</DatePicker>
                            {
                                reportType != r.product_excess &&
                                <div>
                                    <h2 className="text-left py-3 pt-8 text-2xl">End Date</h2>
                                    <DatePicker isClearable placeholderText="Select End Date" selected={endDate} onChange={(date) => setEndDate(date as Date)}>End Date</DatePicker>
                                </div>
                            }
                        </div>
                        <button
                            aria-label="Serach Again"
                            className="shadow-lg rounded-lg border-blue-300 border-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 mx-8 rounded mb-2 w-full"
                            onClick={() => {
                                switch (reportType) {
                                    case r.product_usage:
                                        setLoading(true);
                                        fetch(`/api/reports?reports=product_usage&start=${startDate.getTime()}&end=${endDate.getTime()}`).then(res => res.json()).then(d => {
                                            setLoading(false);
                                            setData(d);
                                            setEmpty(d.length == 0);
                                            setReportType(r.product_usage);
                                        })
                                        break;
                                    case r.product_sales:
                                        setLoading(true);
                                        fetch(`/api/reports?reports=product_sales&start=${startDate.getTime()}&end=${endDate.getTime()}`).then(res => res.json()).then(d => {
                                            setLoading(false);
                                            setData(d);
                                            setEmpty(d.length == 0);
                                            setReportType(r.product_sales);
                                        })
                                        break;
                                    case r.product_excess:
                                        setLoading(true);
                                        fetch(`/api/reports?reports=product_excess&start=${startDate.getTime()}`).then(res => res.json()).then(d => {
                                            setLoading(false);
                                            setData(d);
                                            setEmpty(d.length == 0);
                                            setReportType(r.product_excess);
                                        })
                                        break;
                                    case r.sells_together:
                                        setLoading(true);
                                        fetch(`/api/reports?reports=sells_together&start=${startDate.getTime()}&end=${endDate.getTime()}`).then(res => res.json()).then(d => {
                                            setLoading(false);
                                            setData(d);
                                            setEmpty(d.length == 0);
                                            setReportType(r.sells_together);
                                        })
                                        break;
                                }
                            }}
                        >
                            Search Again
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}