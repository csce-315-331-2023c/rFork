import { getAllMenuItems, getMenuItemByTag, } from '../../../api'
import { NextRequest, NextResponse } from 'next/server'
import { addMenuItem, updateMenuItem } from '../../../api/menu';

export async function GET(request: NextRequest) {
    const tag = request.nextUrl.searchParams.get('tag');
    if (tag) {
        return getMenuItemByTag(tag as string)
            .then((result) => {
                if (result) {
                    return NextResponse.json(result, { status: 200 });
                } else {
                    return NextResponse.json({ message: `No menu item found with tag ${tag}` }, { status: 404 });
                }
            })
            .catch((error) => {
                return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
            });
    } else {
        return getAllMenuItems()
            .then((result) => {
                return NextResponse.json(result, { status: 200 });
            })
            .catch((error) => {
                return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
            });
    }
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    const id = req.nextUrl.searchParams.get('edit');
    if(id){
        return await updateMenuItem(data).then(() => {
            return NextResponse.json({ message: "sucesfully updated item", data })
        }).catch((error) => {
            return NextResponse.json({ message: "frickalik updating menu item failed", data, error }, { status: 500 })
        });
    }else{
        return await addMenuItem(data).then(() => {
            return NextResponse.json({ message: "sucesfully added item", data })
        }).catch((error) => {
            return NextResponse.json({ message: "frickalik adding menu item failed", data, error }, { status: 500 })
        });
    }
    
}