'use client'
import React, { useEffect, useState } from 'react'
import "../../css/index.css"
import ImageButton from '../../components/ImageButton'
import { Languages, MenuItem, Order } from '../../types';
import PageLoading from '../../components/PageLoading';
import TextButton from '../../components/TextButton';
import Popup from '../../components/Popup';
import { IoLanguageOutline } from "react-icons/io5"
import { Dropdown } from 'react-bootstrap';
import { translatePage } from '../../api/translate';
import 'bootstrap/dist/css/bootstrap.css'

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
    const [selectedItemList, setSelectedItemList] = useState<Array<MenuItem>>([]);
    const [selectedItem, setSelectedItem] = useState<MenuItem | undefined>();
    const [categoryTitle, setCategoryTitle] = useState<string>("Sweet Crepes");

    // Final order info data
    const [showCheckoutPopup, setShowCheckoutPopup] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<Array<MenuItem>>([]);

    // MISC Hooks
    const [language, setLanguage] = useState('en');

    // 
    const [subtotal, setSubtotal] = useState<number>(0);
    const [tax, setTax] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const taxMultiplier = 0.05;

    /**
     * Updates the total price of the menu items in the cart
     * @param updatedCartItems list of Menu Item
     */
    function updateOrderTotal(updatedCartItems: MenuItem[] = cartItems) {
        let updatedSubtotal = 0;
        updatedCartItems.forEach((menuItem) => {
            updatedSubtotal += menuItem.price;
        });
        setSubtotal(updatedSubtotal);
        setTax(updatedSubtotal * taxMultiplier);
        setTotal(updatedSubtotal + updatedSubtotal * taxMultiplier);
    }

    useEffect(() => {
        updateOrderTotal();
    }, [cartItems]);

    useEffect(() => {
        getMenuItemCategory("Sweet Crepes").then((data) => {
            setSweetCrepes(data);
            setSelectedItemList(data);
            setLoading(false);
        });
        getMenuItemCategory("Savory Crepes").then((data) => setSavoryCrepes(data));
        getMenuItemCategory("Waffles").then((data) => setWaffles(data));
        getMenuItemCategory("Soups").then((data) => setSoups(data));
        getMenuItemCategory("Drinks").then((data) => setDrinks(data));
    }, []);

    useEffect(() => {
        translatePage(language);
    }, [language, showCheckoutPopup, showCustomizationPopup, selectedItemList]);

    /**
     * Fetches the menu items from the api with the given tag
     * @param tag tag of the desired items
     * @returns list of MenuItem
     */
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
            }
        }, [borderDirection]);

        return (
            <button
                id='google-translate-element'
                onClick={onPress}
                className={`border-gray-700 px-4 h-full flex-1 text-xl ${extraClasses} ${borderClasses}`}
                onMouseEnter={() => setExtraClasses("underline bg-[#3332]")}
                onMouseLeave={() => setExtraClasses("")}
                aria-label={`Select ${text} Category`}
            >
                {text}
            </button>
        );
    }

    /**
     * Adds a menu item to the order
     * @param menuItem 
     */
    function addToOrder(menuItem: MenuItem): void {
        const updatedCartItems = cartItems;
        updatedCartItems.push({ ...menuItem });
        setCartItems(updatedCartItems);
        updateOrderTotal(updatedCartItems)
    }

    /**
     * Removes an item from the order
     * @param index the item index in the order
     */
    function removeFromOrder(index: number): void {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
    }

    /**
     * Checks if a menu item is a drink
     * @param menuItem menu item to check
     * @returns boolean
     */
    function isDrink(menuItem: MenuItem | undefined): boolean {
        if (!menuItem) {
            return false;
        }
        for (let i = 0; i < drinks.length; i++) {
            if (drinks.at(i)?.id == menuItem.id) {
                return true;
            }
        }
        return false
    }

    return (
        <div className='flex flex-col h-screen'>
            {/* Navbar */}
            <header className='h-[10%] w-full flex flex-row items-center justify-start px-6 py-2 bg-[#d6e3ff]'>
                <img src='https://www.sweetparis.com/assets/logos/sweet-paris-logo.svg' className='max-h-16 mr-6' alt='' />
                <KioskNavButton onPress={() => { setSelectedItemList(sweetCrepes); setCategoryTitle("Sweet Crepes"); }} borderDirection={Direction.RIGHT} text='Sweet Crepes' />
                <KioskNavButton onPress={() => { setSelectedItemList(savoryCrepes); setCategoryTitle("Savory Crepes"); }} borderDirection={Direction.RIGHT} text='Savory Crepes' />
                <KioskNavButton onPress={() => { setSelectedItemList(waffles); setCategoryTitle("Waffles"); }} borderDirection={Direction.RIGHT} text='Waffles' />
                <KioskNavButton onPress={() => { setSelectedItemList(soups); setCategoryTitle("Soups (Seasonal)"); }} borderDirection={Direction.RIGHT} text='Soups' />
                <KioskNavButton onPress={() => { setSelectedItemList(drinks); setCategoryTitle("Drinks"); }} borderDirection={Direction.NONE} text='Drinks' />
                <Dropdown className='hover:bg-[#3333]'>
                    <Dropdown.Toggle variant='Secondary' className='flex flex-col justify-center items-center hover:cursor-pointer p-2 h-full'>
                        <IoLanguageOutline fontSize={"2.5rem"} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            Object.keys(Languages).map((language) => {
                                return (
                                    <Dropdown.Item key={language} onClick={() => {
                                        if (language == "English") {
                                            location.reload();
                                        }
                                        setLanguage((Languages as any)[language]);
                                    }}>
                                        {language}
                                    </Dropdown.Item>
                                )
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </header>

            {/* Menu Content */}
            <div className='px-10 py-2 flex-1 h-4 overflow-y-auto'>
                <h1 id='google-translate-element' className='text-4xl underline m-2'>{categoryTitle}</h1>
                <div className='grid grid-cols-4 gap-4'>
                    {selectedItemList.map((menuItem, index) => {
                        return (
                            <ImageButton
                                key={`${menuItem.name} ${index}`}
                                text={menuItem.name}
                                onPress={() => {
                                    setSelectedItem(menuItem);
                                    setShowCustomizationPopup(true);
                                }}
                                price={menuItem.price}
                                color='#FFF'
                                imageURI={menuItem.imageURI}
                            />
                        )
                    })}
                </div>
            </div>

            {/* Bottom Buttons */}
            <footer className='h-[10%]'>
                <div className='flex flex-row items-center h-full'>
                    <TextButton
                        customClassName='flex-1 py-2 h-full text-2xl'
                        text='Cancel Order'
                        onPress={() => setCartItems([])}
                    />
                    <TextButton
                        customClassName='flex-1 py-2 h-full text-2xl'
                        text={`Checkout/Edit Order`}
                        onPress={() => setShowCheckoutPopup(true)}
                        color='#006aff'
                        hoverColor='#80ddff'
                    />
                </div>
            </footer>

            {/* Popups */}
            <Popup
                show={showCustomizationPopup}
            >
                <div className='flex flex-col h-[95%] w-[90%] bg-white rounded-lg overflow-hidden'>
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
                    <div className='flex-1 flex flex-col justify-center overflow-clip'>
                        <img className='w-full' src={selectedItem?.imageURI}></img>
                    </div>
                    <div className='flex flex-row justify-between h-[5%]'>
                        <p className='p-1 text-lg'>{selectedItem?.description}</p>
                        <div className='m-1 p-1 h-full bg-purple-600 rounded-lg text-white'>
                            <p className='text-lg text-center' aria-description={`Price of ${selectedItem?.name}`}>
                                {`$${selectedItem?.price.toFixed(2)}`}
                            </p>
                        </div>
                    </div>
                    <div className='h-[60%] grid grid-cols-3 grid-rows-6 gap-2 p-2'>
                        {selectedItem && !isDrink(selectedItem) ? selectedItem.ingredients.map((ingredient) => {
                            return (
                                <TextButton
                                    key={ingredient.itemId}
                                    text={`Remove ${ingredient.itemName}`}
                                    toggleable

                                />
                            )
                        }) : <p className='text-center text-4xl col-span-3' aria-description='Information about specific item'>No modifications are allowed for this item.</p>
                        }
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
                            color='#006aff'
                            hoverColor='#80ddff'
                        />
                    </footer>
                </div>
            </Popup>
            <Popup
                show={showCheckoutPopup}
            >
                <div className='flex flex-col h-full w-full bg-white'>
                    <div className='flex flex-col flex-1'>
                        <div className='flex flex-row justify-end items-center'>
                            <p aria-description='Total cost of order' className='text-xl pr-6'>{`$${total.toFixed(2)} ($${tax.toFixed(2)} tax)`}</p>
                        </div>
                        {
                            cartItems.length > 0 &&
                            (<table className='text-lg mx-4'>
                                <thead>
                                    <tr className='border-black border-b-2'>
                                        <td id='google-translate-element' className='text-xl' aria-description='Name Column'><strong>Name</strong></td>
                                        <td id='google-translate-element' className='text-xl' aria-description='Price Column'><strong>Price</strong></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item, index) => {
                                        return (
                                            <tr key={`${item.name} ${index}`} className='mb-4 h-4'>
                                                <td id='google-translate-element' key={`${item.name} ${index} 0`} className='text-2xl' aria-description='Name of a cart item'>{item.name}</td>
                                                <td id='google-translate-element' key={`${item.name} ${index} 1`} className='text-2xl' aria-description='Price of a cart item'>{`$${item.price.toFixed(2)}`}</td>
                                                <td key={`${item.name} ${index} 21342`}>
                                                    <TextButton
                                                        text='X'
                                                        onPress={() => {
                                                            removeFromOrder(index);
                                                        }}
                                                        color='#AAA'
                                                        hoverColor='#F44'
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>) ||
                            <p id='google-translate-element' className='text-center text-4xl'>There are no items to display</p>
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
                                setCartItems([]);
                            }}
                            color='#006aff'
                            hoverColor='#80ddff'
                        />
                    </footer>
                </div>
            </Popup>
        </div>
    )
}