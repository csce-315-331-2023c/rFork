'use client'
import React, { useEffect, useState } from 'react'
import { product_usage, product_sales, product_excess, restock_report, sells_together} from '../../../api/reports'
import "../../../css/index.css"

export default function reportView(){

    enum r{
        product_usage,
        product_sales,
        product_excess,
        restock_report,
        sells_together
    }

    const [reportType, setReportType] = useState<r>(r.product_usage);

    useEffect(() => {
        fetch('/api/reports').then(res => res.json()).then(d => {
            setData(d);
        })
    }, []);

    const [data, setData] = useState<Array<any>>([]);

    return(

        <div className ="justify-center h-screen">  
            <button className = "bg-gray-100 p-8 border-red-800 border-8" onClick={() => setReportType(r.product_usage)}>Product Usage</button>
            <button className = "bg-gray-100 p-8 border-red-800 border-8" onClick={() => setReportType(r.product_sales)}>Product Sales</button>
            <button className = "bg-gray-100 p-8 border-red-800 border-8" onClick={() => setReportType(r.product_excess)}>Product Excess</button>
            <button className = "bg-gray-100 p-8 border-red-800 border-8" onClick={() => setReportType(r.restock_report)}>Restock Report</button>
            <button className = "bg-gray-100 p-8 border-red-800 border-8" onClick={() => setReportType(r.sells_together)}>Sells Together</button>
            {
                reportType == r.product_usage &&
                <div>
                    
                </div>
            }
            {
                reportType == r.product_sales &&
                <div>
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