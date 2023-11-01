import { NextRequest, NextResponse } from "next/server";
import { submitOrder } from "../../../api"


export async function POST(req: NextRequest) {
    const data = await req.json()

    return await submitOrder(data).then(() => {
        return NextResponse.json({ message: ":D", data })
    }).catch((error) => {
        return NextResponse.json({ message: "You done goofed", data, error }, { status: 500 })
    });
}
