'use client'
import React, { useEffect, useState } from 'react'
import "../../css/index.css"
import ImageButton from '../../components/ImageButton'
import { MenuItem, Order } from '../../types';
import PageLoading from '../../components/PageLoading';
import TextButton from '../../components/TextButton';
import Popup from '../../components/Popup';

export default function Kiosk() {
    // User flow hooks
    const [loading, setLoading] = useState<boolean>(true);
    const [showCustomizationPopup, setShowCustomizationPopup] = useState<boolean>(false);

    const testMenuItem: MenuItem = {
        name: "[MENU ITEM]",
        price: 12.50,
        ingredients: [{ itemId: 0, itemName: "[MENU ITEM INGREDIENT]", quantity: 5 }],
        validExtras: [],
    }

    // Lists of different tagged menu items
    const [sweetCrepes, setSweetCrepes] = useState<Array<MenuItem>>([testMenuItem]);
    const [savoryCrepes, setSavoryCrepes] = useState<Array<MenuItem>>([]);
    const [waffles, setWaffles] = useState<Array<MenuItem>>([]);
    const [soups, setSoups] = useState<Array<MenuItem>>([]);
    const [drinks, setDrinks] = useState<Array<MenuItem>>([]);


    // Temporary/Volatile data for user selecting experience
    const [selectedItemList, setSelectedItemList] = useState<Array<MenuItem>>(sweetCrepes);
    const [selectedItem, setSelectedItem] = useState<MenuItem | undefined>();

    // Final order info data
    const [showCheckoutPopup, setShowCheckoutPopup] = useState<boolean>(false);
    const [orderInfo, setOrderInfo] = useState<Order>();
    const [cartItems, setCartItems] = useState<Array<MenuItem>>([]);

    useEffect(() => {
        fetch(`/api/menu?tag=${encodeURIComponent("Sweet Crepe")}`).then(async (response) => {
            const data = await response.json();
            console.log(data);
            if (typeof data == "object") {
                setSweetCrepes(data);
            }
        }).catch((err) => {
            alert(`An issue occured fetching from the database: ${err}`);
        });

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
                className={`border-gray-700 px-4 h-full flex-1 text-xl ${extraClasses} ${borderClasses}`}
                onMouseEnter={() => setExtraClasses("underline bg-[#3332]")}
                onMouseLeave={() => setExtraClasses("")}
            >
                {text}
            </button>
        );
    }

    function addToOrder(menuItem: MenuItem) {
        const updatedCartItems = cartItems;
        updatedCartItems.push(menuItem);
        setCartItems(updatedCartItems);
        console.log(cartItems);
    }

    return (
        <div className='flex flex-col h-screen'>

            {/* Navbar */}
            <header className='h-[10%] w-full flex flex-row items-center justify-start px-6 py-2 bg-[#d6e3ff]'>
                <img src='https://www.sweetparis.com/assets/logos/sweet-paris-logo.svg' className='max-h-16 mr-6' />
                <KioskNavButton onPress={() => setSelectedItemList(sweetCrepes)} borderDirection={Direction.RIGHT} text='Sweet Crepes' />
                <KioskNavButton onPress={() => setSelectedItemList(savoryCrepes)} borderDirection={Direction.RIGHT} text='Savory Crepes' />
                <KioskNavButton onPress={() => setSelectedItemList(waffles)} borderDirection={Direction.RIGHT} text='Waffles' />
                <KioskNavButton onPress={() => setSelectedItemList(soups)} borderDirection={Direction.RIGHT} text='Soups' />
                <KioskNavButton onPress={() => setSelectedItemList(drinks)} borderDirection={Direction.NONE} text='Drinks' />
            </header>

            {/* Menu Content */}
            <div className='px-10 py-2 flex-1 h-4 overflow-y-auto'>
                <h1 className='text-4xl underline'>Items</h1>
                <div className='grid grid-cols-4 gap-4'>
                    {selectedItemList.map((menuItem) => {
                        return (
                            <ImageButton
                                key={menuItem.name}
                                text={menuItem.name}
                                onPress={() => {
                                    setSelectedItem(menuItem);
                                    setShowCustomizationPopup(true);
                                }}
                            />
                        )
                    })}
                </div>
            </div>

            {/* Bottom Buttons */}
            <footer className='h-[10%]'>
                <div className='flex flex-row items-center h-full'>
                    <TextButton customClassName='flex-1 py-2 h-full text-2xl' text='Cancel Order' />
                    <TextButton
                        customClassName='flex-1 py-2 h-full text-2xl'
                        text='Checkout'
                        onPress={() => setShowCheckoutPopup(true)}
                    />
                </div>
            </footer>

            {/* Popups */}
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
                        {selectedItem && selectedItem.ingredients.map((ingredient) => {
                            return (
                                <TextButton key={ingredient.itemId} text={`Remove ${ingredient.itemName}`} />
                            )
                        })}
                    </div>
                    <footer className='h-[10%] flex flex-row p-2 gap-10'>
                        <TextButton text='Cancel' onPress={() => setShowCustomizationPopup(false)} />
                        <TextButton
                            text='Add to Order'
                            onPress={() => {
                                if (selectedItem) {
                                    addToOrder(selectedItem);
                                }
                                setShowCustomizationPopup(false);
                            }}
                            color='#FF9638'
                            hoverColor='#FFC38E'
                        />
                    </footer>
                </div>
            </Popup>
            <Popup
                show={showCheckoutPopup}
            >
                <div className='flex flex-col h-full w-full bg-white'>
                    <div className='flex flex-col flex-1'>
                        {
                            cartItems.length > 0 &&
                            (<table className=''>
                                <tr>
                                    <td>Item Name</td>
                                    <td>Item Price</td>
                                    <td></td>
                                </tr>
                                {cartItems.map((item) => {
                                    return (
                                        <tr key={item.name} className=''>
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                        </tr>
                                    );
                                })}
                            </table>) ||
                            <p>There are no items to display</p>
                        }
                    </div>
                    <footer className='h-[10%] flex flex-row p-2 gap-10'>
                        <TextButton text='Back' onPress={() => setShowCheckoutPopup(false)} />
                        <TextButton
                            text='Submit'
                            onPress={async () => {
                                const order: Order = {
                                    timestamp: new Date(),
                                    items: cartItems,
                                    total: 100,
                                    submittedBy: {
                                        id: 1,
                                        firstName: "KIOSK",
                                        lastName: "KIOSK",
                                        role: "Employee",
                                    }
                                }
                                await fetch("/api/orders", { method: "POST", body: JSON.stringify(order) })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        console.log(data);
                                    })
                                    .catch((err) => alert(`Issue occured while requesting post to server ${err}`));
                                setShowCheckoutPopup(false);
                            }}
                            color='#FF9638'
                            hoverColor='#FFC38E'
                        />
                    </footer>
                </div>
            </Popup>
        </div>
    )
}