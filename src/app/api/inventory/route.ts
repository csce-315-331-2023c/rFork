import { getAllInventoryItems } from '../../../api'
import { NextRequest, NextResponse } from 'next/server'
import { addInventoryItem } from '../../../api/inventory'
import { Result } from 'postcss'

export async function GET() {
    return getAllInventoryItems().then((result) => {
        return NextResponse.json(result, { status: 200 })
    }).catch((error) => {
        return NextResponse.json({ message: "Something went wrong", error }, { status: 500 })
    })
}

export async function POST(req: NextRequest) {
    const data = await req.json()

    return await addInventoryItem(data).then(() => {
        return NextResponse.json({ message: "sucesfully added item", data })
    }).catch((error) => {
        return NextResponse.json({ message: "frickalik", data, error }, { status: 500 })
    });
}
