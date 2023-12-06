import { getAllInventoryItems } from '../../../api'
import { NextRequest, NextResponse } from 'next/server'
import { addInventoryItem, updateInventoryItem, deleteInventoryItem } from '../../../api/inventory'
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
    const delete_id = req.nextUrl.searchParams.get('delete');
    const update_tag =  req.nextUrl.searchParams.get('update');
    if (update_tag) {
        return await updateInventoryItem(data).then(() => {
            return NextResponse.json({ message: "sucesfully updated item", data })
        }).catch((error) => {
            return NextResponse.json({ message: "frickalik updating inventory item failed", data, error }, { status: 500 })
        });
    } else if (delete_id) {
        return await deleteInventoryItem(data).then(() => {
            return NextResponse.json({ message: "sucesfully deleted inventory item", data })
        }).catch((error) => {
            return NextResponse.json({ message: "frickalik deleting menu item failed", data, error }, { status: 500 })
        });
    }
    else {
        return await addInventoryItem(data).then(() => {
            return NextResponse.json({ message: "sucesfully added item", data })
        }).catch((error) => {
            return NextResponse.json({ message: "frickalik", data, error }, { status: 500 })
        });
    }

}
