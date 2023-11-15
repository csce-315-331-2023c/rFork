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
            {/* <header className='py-5'>
                MENU BOARD
            </header> */}
            <header className='flex flex-row border-2 border-black'>
                <div className='flex flex-row justify-center border border-black rounded-xl m-4 p-2 align-center flex-1'>
                    <img className='rounded-xl' src="https://www.w3schools.com/html/pic_trulli.jpg" alt="Featured Item 1"></img>
                </div>
                <div className='flex flex-row justify-center border border-black rounded-xl m-4 p-2 align-center flex-1'>
                    <img className='rounded-xl' src="https://www.w3schools.com/html/img_chania.jpg" alt="Featured Item 2"></img>
                </div>
            </header>

            <div>Crepes</div>
            <div>
                Crepe items
                {testMenuItem.name}
            </div>
            <div>Seasonal</div>
            <div>Sides</div>
            <div>Drinks</div>

            <div>
                Here are the first 8 items:
                {/* <div>{menuItems.slice(0, 8).map((menuItem, index) => (
                    <ImageButton
                        text={menuItem.name}
                        price={menuItem.price}
                        key={index}
                    />
                ))}</div> */}
            </div>
        </div>
    )
}
