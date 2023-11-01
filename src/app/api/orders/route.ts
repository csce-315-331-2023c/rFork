import { NextRequest, NextResponse } from "next/server";
import { submitOrder } from "../../../api"


export async function POST(req: NextRequest){
    const data = await req.json()

    console.log(data);
    await submitOrder(data);

    return NextResponse.json({message: ":D", data})
}