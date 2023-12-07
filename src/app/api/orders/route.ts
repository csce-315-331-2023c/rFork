import { NextRequest, NextResponse } from "next/server";
import { submitOrder, getAll, getNotFinished } from "../../../api"

/**
 * Posts order information to the website based on request information
 * @param req NextRequest object
 * @returns 
 */
export async function POST(req: NextRequest) {
    const data = await req.json()

    return await submitOrder(data).then(() => {
        return NextResponse.json({ message: ":D", data })
    }).catch((error) => {
        return NextResponse.json({ message: "You done goofed", data, error }, { status: 500 })
    });
}

/**
 * Gets the json information for the orders 
 * @param req NextRequest object
 * @returns 
 */
export async function GET(req: NextRequest) {
    const history = req.nextUrl.searchParams.get('history') || '';

    switch(history){
        case 'getAll':
            return NextResponse.json(await getAll());

        case 'getNotFinished':
            return NextResponse.json(await getNotFinished());
        
        default:
            return NextResponse.json({ message: "Invalid get type" }, { status: 400 });
    }
}
