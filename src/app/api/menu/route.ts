import { getAllMenuItems, getMenuItemByTag, } from '../../../api'
import { NextRequest, NextResponse } from 'next/server'
import { addMenuItem, deleteMenuItem, updateMenuItem, getAllMenuItemTags, addMenuTag, updateMenuTag } from '../../../api/menu';

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
    const add_tag =  req.nextUrl.searchParams.get('add-tag');
    const update_tag =  req.nextUrl.searchParams.get('update-tag');

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
    }else if(add_tag){
        return await addMenuTag(data, add_tag as string).then(() => {
            return NextResponse.json({ message: "sucesfully added menu tag", data })
        }).catch((error) => {
            return NextResponse.json({ message: "frickalik failed to add menu tag", data, error }, { status: 500 })
        });
    }else if(update_tag){
        return await updateMenuTag(data, update_tag as string).then(() => {
            return NextResponse.json({ message: "sucesfully update menu tag", data })
        }).catch((error) => {
            return NextResponse.json({ message: "frickalik failed to update menu tag", data, error }, { status: 500 })
        });
    }
    else {
        return await addMenuItem(data).then(() => {
            return NextResponse.json({ message: "sucesfully added item", data })
        }).catch((error) => {
            return NextResponse.json({ message: "frickalik adding menu item failed", data, error }, { status: 500 })
        });
    }

}