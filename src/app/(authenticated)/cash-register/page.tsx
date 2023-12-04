'use client'
import React, { useEffect, useState } from 'react';
import "../../../css/index.css";
import { MenuItem, Order } from '../../../types';
import TextButton from '../../../components/TextButton';
import PageLoading from '../../../components/PageLoading';
import Link from 'next/link';
import AuthSessionHeader from '../../../components/AuthSessionHeader';

export default function CashRegister() {
    // Data Hooks
    const [loading, setLoading] = useState<boolean>(true);

    const [subtotal, setSubtotal] = useState<number>(0);
    const [tax, setTax] = useState<number>(0);
    const [tip, setTip] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    // Lists of different tagged menu items
    const [sweetCrepes, setSweetCrepes] = useState<Array<MenuItem>>([]);
    const [savoryCrepes, setSavoryCrepes] = useState<Array<MenuItem>>([]);
    const [waffles, setWaffles] = useState<Array<MenuItem>>([]);
    const [soups, setSoups] = useState<Array<MenuItem>>([]);
    const [drinks, setDrinks] = useState<Array<MenuItem>>([]);

    // Temporary/Volatile data for user selecting experience
    const [selectedItemList, setSelectedItemList] = useState<Array<MenuItem>>([]);
    const [selectedItem, setSelectedItem] = useState<MenuItem | undefined>();

    // Final order info data
    const [showCheckoutPopup, setShowCheckoutPopup] = useState<boolean>(false);
    const [orderInfo, setOrderInfo] = useState<Order>();
    const [cartItems, setCartItems] = useState<Array<MenuItem>>([]);

    const [middleRightChildren, setMiddleRightChildren] = useState<React.JSX.Element[] | null>(null);
    const [bottomRightChildren, setBottomRightChildren] = useState<React.JSX.Element[] | null>(null);

    // Component Constants
    const discountButtons = [
        (<TextButton text='-5%' key={0} />),
        (<TextButton text='-10%' key={1} />),
    ];

    const tipButtons = [
        (<TextButton text='10%' key={0} />),
        (<TextButton text='15%' key={1} />),
        (<TextButton text='20%' key={2} />),
    ];
    // Closure Functions

    useEffect(() => {
        getMenuItemCategory("Sweet Crepes").then((data) => setSweetCrepes(data));
        getMenuItemCategory("Savory Crepes").then((data) => setSavoryCrepes(data));
        getMenuItemCategory("Waffles").then((data) => setWaffles(data));
        getMenuItemCategory("Soups").then((data) => setSoups(data));
        getMenuItemCategory("Drinks").then((data) => setDrinks(data));

        setLoading(false);
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

    function updateOrderTotal(updatedCartItems: MenuItem[]) {
        let updatedSubtotal = 0;
        updatedCartItems.forEach((menuItem) => {
            updatedSubtotal += menuItem.price;
        });
        console.log(updatedSubtotal);
        setSubtotal(updatedSubtotal);
    }

    function addToOrder(menuItem: MenuItem) {
        const updatedCartItems = [...cartItems];
        updatedCartItems.push(menuItem);
        setCartItems(updatedCartItems);
        setMiddleRightChildren(null);
        setBottomRightChildren(null);
        updateOrderTotal(updatedCartItems);
    }

    function removeFromOrder(index: number) {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
        updateOrderTotal(updatedCartItems);
    }

    /**
     * Creates the middle content that displays each menu item in a given menu item list
     * @param menuItemList List of menu items to display
     */
    function createMiddleMenuItemContent(menuItemList: MenuItem[]) {
        const middleContent = menuItemList.map((item) => {
            return (<TextButton
                key={item.name}
                text={item.name}
                onPress={() => {
                    let bottomContent = item.ingredients.map((ingredient) => {
                        return (
                            <TextButton
                                key={ingredient.itemName}
                                text={`Remove ${ingredient.itemName}`}
                            />
                        )
                    });
                    const addToOrderButton = <TextButton
                        key={"Add to Order"}
                        text={`Add to Order`}
                        color='#0077FF'
                        onPress={() => addToOrder(item)}
                    />;

                    bottomContent = [...bottomContent, addToOrderButton]
                    setBottomRightChildren(bottomContent);
                }}
            />);
        });
        setMiddleRightChildren(middleContent);
        setBottomRightChildren(null);
    }

    if (loading) return (<PageLoading />);

    // HTML Rendering
    return (
        <div className='flex flex-col h-screen'>
            <AuthSessionHeader />
            <div className='grid grid-cols-3 grid-rows-3 flex-1 w-full'>
                {/* Left Side */}
                <div className='row-span-3 border-gray-500 border-r-2 flex flex-col'>
                    <div className='border-gray-500 border-y-2'>Order # 12345</div>
                    <div className='flex-1'>
                        <table className='w-full'>
                            <thead className=''>
                                <tr>
                                    <td className='w-[50%]'>Item Name</td>
                                    <td className=''>Price</td>
                                    <td className=''>Qty</td>
                                    <td className=''>Total</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartItems.map((item, index) => {
                                        return (
                                            <tr key={`${item.name}${index}`}>
                                                <td className='pr-2'>{item.name}</td>
                                                <td className='pr-2'>{`$${item.price}`}</td>
                                                <td className='pr-2'>
                                                    <input className='border-[#3d3d3d] border-2' defaultValue={1} />
                                                </td>
                                                <td>{`$${item.price}`}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='grid grid-cols-2 grid-rows-2 p-2 gap-2 h-1/3 border-gray-500 border-t-2'>
                        <div></div>
                        <div className='flex flex-row justify-between px-10'>
                            <ul>
                                <li>Subtotal:</li>
                                <li>Tax:</li>
                                <li>Tip:</li>
                                <li>Total:</li>
                            </ul>
                            <ul>
                                <li>{`\$${subtotal.toFixed(2)}`}</li>
                                <li>{`\$${tax.toFixed(2)}`}</li>
                                <li>{`\$${tip.toFixed(2)}`}</li>
                                <li>{`\$${total.toFixed(2)}`}</li>
                            </ul>
                        </div>
                        <TextButton text='Cancel Order' onPress={() => setCartItems([])} />
                        <TextButton
                            text='Pay'
                            color='#3de8e0'
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
                                        setCartItems([]);
                                    })
                                    .catch((err) => alert(`Issue occured while requesting post to server ${err}`));
                            }}
                        />
                    </div>
                </div>
                {/* Right Side */}
                <div className='col-span-2 flex flex-col bg-white'>
                    <h2 className='text-center text-2xl border-gray-500 border-y-2'>Category</h2>
                    <div className='grid grid-cols-5 grid-rows-3 gap-2 px-4 py-2 flex-1'>
                        <TextButton
                            text='Sweet Crepes'
                            onPress={() => createMiddleMenuItemContent(sweetCrepes)}
                            key={"sweetCrepeButton"}
                            color='#FFF3B9'
                        />
                        <TextButton
                            text='Savory Crepes'
                            onPress={() => createMiddleMenuItemContent(savoryCrepes)}
                            key={"savoryCrepeButton"}
                        />
                        <TextButton
                            text='Waffles'
                            onPress={() => createMiddleMenuItemContent(waffles)}
                            key={"waffleButton"}
                        />
                        <TextButton
                            text='Soups'
                            onPress={() => createMiddleMenuItemContent(soups)}
                            key={"soupsButton"}
                        />
                        <TextButton
                            text='Drinks'
                            onPress={() => createMiddleMenuItemContent(drinks)}
                            key={"drinkButton"}
                        />
                        <TextButton
                            text='Discounts'
                            onPress={() => {
                                setMiddleRightChildren(discountButtons);
                                setBottomRightChildren(null);
                            }}
                            key={"discountButton"}
                        />
                        <TextButton
                            text='Tips'
                            onPress={() => {
                                setMiddleRightChildren(tipButtons);
                                setBottomRightChildren(null);
                            }}
                            key={"tipButton"}
                        />
                    </div>
                </div>
                <div className='col-span-2 flex flex-col bg-white'>
                    <h2 className='text-center text-2xl border-gray-500 border-y-2'>Options</h2>
                    <div className='grid grid-cols-5 grid-rows-3 gap-2 px-4 py-2 flex-1'>
                        {middleRightChildren}
                    </div>
                </div>
                <div className='col-span-2 flex flex-col bg-white'>
                    <h2 className='text-center text-2xl border-gray-500 border-y-2'>Add-ons</h2>
                    <div className='grid grid-cols-5 grid-rows-3 gap-2 px-4 py-2 flex-1'>
                        {bottomRightChildren}
                    </div>
                </div>
            </div>

        </div>
    )
}
