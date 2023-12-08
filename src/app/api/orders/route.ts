import { NextRequest, NextResponse } from "next/server";
import { submitOrder, getAll, getNotFinished, changeStatus, deleteOrder } from "../../../api/order"

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

export async function PATCH(req: NextRequest) {
    const history = req.nextUrl.searchParams.get('id') || '';
    await changeStatus(parseInt(history))
    return NextResponse.json({ message: "Order status changed" })
}

export async function DELETE(req: NextRequest) {
    const history = req.nextUrl.searchParams.get('delete') || '';
    console.log(history);
    await deleteOrder(parseInt(history))
    return NextResponse.json({ message: "Order deleted" })
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
