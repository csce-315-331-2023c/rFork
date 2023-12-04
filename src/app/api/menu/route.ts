import { getAllMenuItems, getMenuItemByTag, } from '../../../api'
import { NextRequest, NextResponse } from 'next/server'
import { addMenuItem, deleteMenuItem, updateMenuItem, getAllMenuItemTags } from '../../../api/menu';

export async function GET(request: NextRequest) {
    const tag = request.nextUrl.searchParams.get('tag');
    if (tag) {
        if (tag == "all") {
            return getAllMenuItemTags()
                
                .then((result) => {
                    if (result) {
                        return NextResponse.json(result, { status: 200 });
                    } else {
                        return NextResponse.json({ message: `No menu items}` }, { status: 404 });
                    }
                })
                .catch((error) => {
                    console.log("lmao");
                    return NextResponse.json({ message: 'Something went wrong in getting all menuItemTags', error }, { status: 500 });
                });
        } else {
            return getMenuItemByTag(tag as string)
                .then((result) => {
                    if (result) {
                        return NextResponse.json(result, { status: 200 });
                    } else {
                        return NextResponse.json({ message: `No menu item found with tag ${tag}` }, { status: 404 });
                    }
                })
                .catch((error) => {
                    return NextResponse.json({ message: 'Something went wrong in getting Menu Item by Tag', error }, { status: 500 });
                });
        }
    } else {
        return getAllMenuItems()
            .then((result) => {
                return NextResponse.json(result, { status: 200 });
            })
            .catch((error) => {
                return NextResponse.json({ message: 'Something went wrong in getting All Menu Items', error }, { status: 500 });
            });
    }
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    const edit_id = req.nextUrl.searchParams.get('edit');
    const delete_id = req.nextUrl.searchParams.get('delete');
    if (edit_id) {
        return await updateMenuItem(data).then(() => {
            return NextResponse.json({ message: "sucesfully updated item", data })
        }).catch((error) => {
            return NextResponse.json({ message: "frickalik updating menu item failed", data, error }, { status: 500 })
        });
    } else if (delete_id) {
        return await deleteMenuItem(data).then(() => {
            return NextResponse.json({ message: "sucesfully deleted item", data })
        }).catch((error) => {
            return NextResponse.json({ message: "frickalik deleting menu item failed", data, error }, { status: 500 })
        });
    } {
        return await addMenuItem(data).then(() => {
            return NextResponse.json({ message: "sucesfully added item", data })
        }).catch((error) => {
            return NextResponse.json({ message: "frickalik adding menu item failed", data, error }, { status: 500 })
        });
    }

}