'use client'
import React, { useEffect, useState } from 'react'
import "../../css/index.css"
import KioskButton from '../../components/ImageButton'
import { MenuItem, Order } from '../../types';
import PageLoading from '../../components/PageLoading';
import TextButton from '../../components/TextButton';
import Link from 'next/link';
import Popup from '../../components/Popup';

export default function Kiosk() {
    // User flow hooks
    const [loading, setLoading] = useState<boolean>(true);
    const [showCustomizationPopup, setShowCustomizationPopup] = useState<boolean>(true);
    
    // Lists of different tagged menu items
    const [sweetCrepes, setSweetCrepes] = useState<Array<MenuItem>>([]);
    const [savoryCrepes, setSavoryCrepes] = useState<Array<MenuItem>>([]);
    const [waffles, setWaffles] = useState<Array<MenuItem>>([]);
    const [soups, setSoups] = useState<Array<MenuItem>>([]);
    const [drinks, setDrinks] = useState<Array<MenuItem>>([]);
    
    const testMenuItem = {
        name: "[MENU ITEM]",
        price: 12.50,
        ingredients: [{ inventoryId: 0, name: "[MENU ITEM INGREDIENT]", quantity: 5 }],
    }
    
    // Data for adding item to cart
    const [selectedItem, setSelectedItem] = useState<MenuItem>(testMenuItem);

    // Final order info data
    const [orderInfo, setOrderInfo] = useState<Order>();
    const [cartItems, setCartItems] = useState<Array<MenuItem>>([]);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) return <PageLoading />;

    const enum Direction {
        LEFT,
        RIGHT,
        BOTH,
        NONE,
    }

    function KioskNavButton({ text, borderDirection, onPress }: { text: string, borderDirection?: Direction, onPress: () => any }): React.JSX.Element {
        const [extraClasses, setExtraClasses] = useState<string>("");
        const [borderClasses, setBorderClasses] = useState<string>("");

        useEffect(() => {
            switch (borderDirection) {
                case Direction.LEFT:
                    setBorderClasses("border-black border-l-2");
                    break;
                case Direction.RIGHT:
                    setBorderClasses("border-black border-r-2");
                    break;
                case Direction.BOTH:
                    setBorderClasses("border-black border-x-2");
                    break;
                default:
                    break;
            }
        }, [borderDirection]);

        return (
            <button
                onClick={onPress}
                className={`border-gray-700 px-4 h-20 flex-1 text-xl ${extraClasses} ${borderClasses}`}
                onMouseEnter={() => setExtraClasses("underline bg-[#3332]")}
                onMouseLeave={() => setExtraClasses("")}
            >
                {text}
            </button>
        );
    }

    function addToOrder(menuItem: MenuItem) {
        const updatedCartItems = cartItems.push(selectedItem);
        console.log(cartItems);
    }

    return (
        <div className='flex flex-col h-screen'>
            <Popup
                show={showCustomizationPopup}
            >
                <div className='flex flex-col h-[90%] w-[60%] bg-white rounded-lg overflow-hidden'>
                    <header className='flex flex-row justify-between items-center bg-[#d6e3ff] p-2'>
                        <div className='h-10 w-10'></div>
                        <h2 className='text-2xl'>{selectedItem?.name}</h2>
                        <TextButton
                            onPress={() => setShowCustomizationPopup(false)}
                            text='X'
                            customClassName='rounded-xl h-10 w-10 text-2xl text-[#ffffff]'
                            color=''
                            hoverColor='#FF3344'
                        />
                    </header>
                    <div className='flex-1 grid grid-cols-3 grid-rows-6 gap-2 p-2'>
                        {selectedItem.ingredients.map((ingredient) => {
                            return (
                                <TextButton key={ingredient.inventoryId} text={`Remove ${ingredient.name}`} />
                            )
                        })}
                    </div>
                    <footer className='h-[10%] flex flex-row p-2 gap-10'>
                        <TextButton text='Cancel' onPress={() => setShowCustomizationPopup(false)} />
                        <TextButton
                            text='Add to Order'
                            onPress={() => {
                                addToOrder(selectedItem);
                                setShowCustomizationPopup(false);
                            }}
                            color='#FF9638'
                            hoverColor='#FFC38E'
                        />
                    </footer>
                </div>
            </Popup>
            {/* Navbar */}
            <header className='h-[10%] w-full'>
                <nav className='flex flex-row items-center justify-start p-6 h-full w-full bg-[#d6e3ff]'>
                    <img src='https://www.sweetparis.com/assets/logos/sweet-paris-logo.svg' className='max-h-16 mr-6' />
                    <KioskNavButton onPress={() => { }} borderDirection={Direction.RIGHT} text='Sweet Crepes' />
                    <KioskNavButton onPress={() => { }} borderDirection={Direction.RIGHT} text='Savory Crepes' />
                    <KioskNavButton onPress={() => { }} borderDirection={Direction.RIGHT} text='Waffles' />
                    <KioskNavButton onPress={() => { }} borderDirection={Direction.RIGHT} text='Soups' />
                    <KioskNavButton onPress={() => { }} borderDirection={Direction.NONE} text='Drinks' />
                </nav>
            </header>
            {/* Menu Content */}
            <div className='px-10 py-2 flex-1 h-4 overflow-y-auto'>
                <h1 className='text-4xl underline'>Items</h1>
                <div className='grid grid-cols-4 gap-4'>

                </div>
            </div>
            {/* Bottom Buttons */}
            <footer className='h-[10%]'>
                <div className='flex flex-row items-center h-full'>
                    <TextButton customClassName='flex-1 py-2 h-full' text='Cancel Order' />
                    <TextButton customClassName='flex-1 py-2 h-full' text='Checkout' />
                </div>
            </footer>
        </div>
    )
}