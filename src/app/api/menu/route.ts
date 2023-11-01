import { getAllMenuItems } from '../../../api'
import { NextResponse } from 'next/server'

export async function GET() {
    return getAllMenuItems().then((result) => {
        return NextResponse.json(result, { status: 200 });
    }).catch((error) => {
        return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
    })
}
