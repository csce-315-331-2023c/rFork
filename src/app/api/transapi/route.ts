import { NextRequest, NextResponse } from "next/server";
import {translate} from "../../../api/external/translate"

export async function POST(req: NextRequest) {
    const data: any = await req.json()
    if(data.key && data.msg){
        return NextResponse.json({ msg: await translate(data.msg, data.key) })
    }
    else{
        return NextResponse.json({ message: "You done goofed" }, { status: 500 })
    }
}