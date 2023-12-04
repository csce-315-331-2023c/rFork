'use client'
import React, { useEffect, useState } from 'react'
import "../../css/index.css"
import ImageButton from '../../components/ImageButton'
import { MenuItem } from '../../types';
import PageLoading from '../../components/PageLoading';

export default function MenuBoard() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Lists of different tagged menu items
    const [sweetCrepes, setSweetCrepes] = useState<Array<MenuItem>>([]);
    const [savoryCrepes, setSavoryCrepes] = useState<Array<MenuItem>>([]);
    const [waffles, setWaffles] = useState<Array<MenuItem>>([]);
    const [soups, setSoups] = useState<Array<MenuItem>>([]);
    const [drinks, setDrinks] = useState<Array<MenuItem>>([]);
    const [featuredItems, setFeaturedItems] = useState<Array<MenuItem>>([]);

    useEffect(() => {
        getMenuItemCategory("Sweet Crepes").then((data) => setSweetCrepes(data));
        getMenuItemCategory("Savory Crepes").then((data) => setSavoryCrepes(data));
        getMenuItemCategory("Waffles").then((data) => setWaffles(data));
        getMenuItemCategory("Soups").then((data) => setSoups(data));
        getMenuItemCategory("Drinks").then((data) => setDrinks(data));
        getMenuItemCategory("Featured").then((data) => setFeaturedItems(data));
    }, []);

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
        <div className='flex flex-col items-center h-screen py-2'>
            <h1 className='text-5xl py-4'><strong>Featured Items</strong></h1>
            <header className='flex flex-row justify-center h-[30%] border-black bg-[#9acbff] w-[95%] rounded-lg'>
                <div className='flex flex-1 flex-col justify-center items-center px-10 py-2 h-full'>
                    <div className='h-[80%]'>
                        <img className='h-full rounded-lg' src={featuredItems[0] ? featuredItems[0].imageURI : ""} />
                    </div>
                    <h2 className='text-3xl'>{featuredItems[0] ? featuredItems[0].name : "No item featured"}</h2>
                </div>
                <div className='flex flex-1 flex-col justify-center items-center px-10 py-2 h-full'>
                    <div className='h-[80%]'>
                        <img className='h-full rounded-lg' src={featuredItems[1] ? featuredItems[1].imageURI : ""} />
                    </div>
                    <h2 className='text-3xl'>{featuredItems[1] ? featuredItems[1].name : "No item featured"}</h2>
                </div>
            </header>

            <div className='flex flex-row w-full'>
                <div className="flex flex-col flex-1 items-center px-10">
                    <h1 className='w-full text-3xl'><i>Sweet Crepes</i></h1>
                    {sweetCrepes.map((item) => (
                        <p key={item.name} className='w-full text-xl py-1'>
                            {`${item.name}.....\$${item.price.toFixed(2)}`}
                        </p>
                    ))}
                </div>
                <div className="flex flex-col flex-1 items-center px-10">
                    <h1 className='w-full text-3xl pt-4'><i>Savory Crepes</i></h1>
                    {savoryCrepes.map((item) => (
                        <p key={item.name} className='w-full text-xl py-1'>
                            {`${item.name}.....\$${item.price.toFixed(2)}`}
                        </p>
                    ))}
                </div>
                <div className="flex flex-col flex-1 items-center px-10">
                    <h1 className='w-full text-3xl pt-4'><i>Waffles</i></h1>
                    {waffles.map((item) => (
                        <p key={item.name} className='w-full text-xl py-1'>
                            {`${item.name}.....\$${item.price.toFixed(2)}`}
                        </p>
                    ))}
                    <h1 className='w-full text-3xl pt-4'><i>Soups (Seasonal)</i></h1>
                    {soups.map((item) => (
                        <p key={item.name} className='w-full text-xl py-1'>
                            {`${item.name}.....\$${item.price.toFixed(2)}`}
                        </p>
                    ))}
                    <h1 className='w-full text-3xl pt-4'><i>Beverages</i></h1>
                    {drinks.map((item) => (
                        <p key={item.name} className='w-full text-xl py-1'>
                            {`${item.name}.....\$${item.price.toFixed(2)}`}
                        </p>
                    ))}
                </div>
                <div className="flex flex-col flex-1 items-center px-10">
                    
                </div>
            </div>
        </div>
    )
}
