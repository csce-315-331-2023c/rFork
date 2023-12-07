import { NextRequest, NextResponse } from "next/server";
import { product_usage, product_sales, product_excess, restock_report, sells_together } from '../../../api/reports'

/**
 * Gets report information as a json
 * @param request 
 * @returns json of report information
 */
export async function GET(request: NextRequest) {
    const report = request.nextUrl.searchParams.get('reports') || '';
    const start = request.nextUrl.searchParams.get('start') || '';
    const end = request.nextUrl.searchParams.get('end') || '';

    switch(report){
        case 'product_usage':
            const startDate3 = new Date(parseInt(start));
            const endDate3 = new Date(parseInt(end));
            return NextResponse.json(await product_usage(startDate3, endDate3));
            
        case 'product_sales':
            const startDate = new Date(parseInt(start));
            const endDate = new Date(parseInt(end));
            return NextResponse.json(await product_sales(startDate, endDate));

        case 'product_excess':
            const startDate4 = new Date(parseInt(start));
            return NextResponse.json(await product_excess(startDate4));

        case 'restock_report':
            return NextResponse.json(await restock_report());

        case 'sells_together':
            const startDate2 = new Date(parseInt(start));
            const endDate2 = new Date(parseInt(end));
            return NextResponse.json(await sells_together(startDate2, endDate2));

        default: 
            return NextResponse.json({ message: "Invalid report type" }, { status: 400 });
    }
}