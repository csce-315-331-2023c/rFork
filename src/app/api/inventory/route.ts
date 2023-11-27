import { getAllInventoryItems } from '../../../api'
import { NextResponse } from 'next/server'
import { addInventoryItem } from '../../../api/inventory'
import { Result } from 'postcss'

export async function GET() {
    return getAllInventoryItems().then((result) => {
        return NextResponse.json(result, { status: 200 })
    }).catch((error) => {
        return NextResponse.json({ message: "Something went wrong", error }, { status: 500 })
    })
}

// Yes this post request doesn't make sense it ruins the point but im going to do it for testing purposes
export async function POST(newItemName: string, currentStock: number, reorderThreshold: number){
    return addInventoryItem(newItemName, currentStock, reorderThreshold).then((result) => {
        return NextResponse.json(result, { status: 200 })
    }).catch((error) => {
        return NextResponse.json({ message: "Something went wrong", error }, { status: 500 })
    })
}