import { getAllMenuItems, getMenuItemByTag } from '../../../api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const { query } = request as unknown as { query: { tag?: string } };
    const { tag } = query;

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
