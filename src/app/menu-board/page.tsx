'use client'
import React, { useEffect, useState } from 'react'
import "../../css/index.css"
import ImageButton from '../../components/ImageButton'
import { MenuItem } from '../../types';
import PageLoading from '../../components/PageLoading';

export default function MenuBoard() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // temp
    const testMenuItem: MenuItem = {
        name: "[MENU ITEM]",
        price: 12.50,
        ingredients: [{ itemId: 0, itemName: "[MENU ITEM INGREDIENT]", quantity: 5 }],
        validExtras: [],
    }

    async function getMenuItemCategory(tag: string): Promise<MenuItem[]> {
        return fetch(`/api/menu?tag=${encodeURIComponent(tag)}`)
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    return data;
                }
                else {
                    throw new Error("Endpoint did not return array");
                }
            })
            .catch((err) => {
                console.error(`Issue fetching items with tag tag '${tag}' from database: ${err}`)
                return [];
            })
    }

    useEffect(() => {
        fetch("/api/menu").then(async (result) => {
            const allMenuItems = await result.json();
            setMenuItems(allMenuItems);
            setLoading(false);
        });
    }, []);

    if (loading) return <PageLoading />;

    return (
        // Creating the template for Menu Board based on the sketch in miro
        <div>
            <a href="/">[Back button]</a>
            <header className='flex flex-row border-2 border-red-600 max-h-[33vh] p-0'>
                <div className='flex flex-row justify-center border border-black rounded-3xl m-4 p-0 align-center flex-1'>
                    <img className='rounded-3xl' src="https://www.w3schools.com/html/pic_trulli.jpg" alt="Featured Item 1"></img>
                </div>
                <div className='flex flex-row justify-center border border-black rounded-3xl m-4 p-0 align-center flex-1'>
                    <img className='rounded-3xl' src="https://www.w3schools.com/html/img_chania.jpg" alt="Featured Item 2"></img>
                </div>
            </header>

            <div className='flex flex-row border-2 border-black'>
                <div className='flex flex-row flex-1 border-2 border-red-500'>
                    <div>Crepes</div>
                    <div>
                        Crepe items
                        {testMenuItem.name}
                    </div>
                {/* </div> */}
                
                {/* <div className='flex flex-row flex-1 border-2 border-green-500'> */}
                    <div>Seasonal</div>
                    <ul>Item</ul>
                </div>

                <div className='flex flex-row flex-1 border-2 border-blue-500'>
                    <div>Sides</div>
                    <ul>Item</ul>
                </div>

                <div className='flex flex-row flex-1 border-2 border-purple-500'>
                    <div>Drinks</div>
                    <ul>Item</ul>
                </div>
            </div>

            <div>
                Here are the first 8 items:
            </div>
        </div>
    )
}
