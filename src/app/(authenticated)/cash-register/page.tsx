'use client'
import React, { useEffect, useState } from 'react';
import "../../../css/index.css";
import { Ingredient, MenuItem, Order } from '../../../types';
import TextButton from '../../../components/TextButton';
import PageLoading from '../../../components/PageLoading';
import Link from 'next/link';
import AuthSessionHeader from '../../../components/AuthSessionHeader';
import { randomColorHex } from '../../../helpers/colorUtils';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'

/**
 * Runs the cash register interface
 */
export default function CashRegister() {
    // Data Hooks
    const [loading, setLoading] = useState<boolean>(true);

    const [subtotal, setSubtotal] = useState<number>(0);
    const [tax, setTax] = useState<number>(0);
    const [tip, setTip] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    const [tipMultiplier, setTipMultiplier] = useState<number>(0);
    const [discountMultiplier, setDiscountMultiplier] = useState<number>(1);
    const taxMultiplier = 0.05;

    // Lists of different tagged menu items
    const [sweetCrepes, setSweetCrepes] = useState<Array<MenuItem>>([]);
    const [savoryCrepes, setSavoryCrepes] = useState<Array<MenuItem>>([]);
    const [waffles, setWaffles] = useState<Array<MenuItem>>([]);
    const [soups, setSoups] = useState<Array<MenuItem>>([]);
    const [drinks, setDrinks] = useState<Array<MenuItem>>([]);

    // Temporary/Volatile data for user selecting experience
    const [selectedItem, setSelectedItem] = useState<MenuItem | undefined>();

    // Final order info data
    const [showCheckoutPopup, setShowCheckoutPopup] = useState<boolean>(false);
    const [orderInfo, setOrderInfo] = useState<Order>();

    const [cartItems, setCartItems] = useState<Array<MenuItem>>([]);
    const [cartItemCounts, setCartItemCounts] = useState<Array<number>>([]);

    const [middleRightChildren, setMiddleRightChildren] = useState<React.JSX.Element[] | null>(null);
    const [bottomRightChildren, setBottomRightChildren] = useState<React.JSX.Element[] | null>(null);

    // Component Constants
    const discountButtons = [
        (<TextButton text='0%' key={"Discount 0"} onPress={() => { setDiscountMultiplier(1); updateOrderTotal(cartItems, cartItemCounts, tipMultiplier, 1) }} />),
        (<TextButton text='-5%' key={"Discount 1"} onPress={() => { setDiscountMultiplier(0.95); updateOrderTotal(cartItems, cartItemCounts, tipMultiplier, 0.95) }} />),
        (<TextButton text='-10%' key={"Discount 2"} onPress={() => { setDiscountMultiplier(0.90); updateOrderTotal(cartItems, cartItemCounts, tipMultiplier, 0.90) }} />),
    ];

    const tipButtons = [
        (<TextButton text='0%' key={"Tip 0"} onPress={() => { setTipMultiplier(0); updateOrderTotal(cartItems, cartItemCounts, 0); }} />),
        (<TextButton text='10%' key={"Tip 1"} onPress={() => { setTipMultiplier(0.1); updateOrderTotal(cartItems, cartItemCounts, 0.1); }} />),
        (<TextButton text='15%' key={"Tip 2"} onPress={() => { setTipMultiplier(0.15); updateOrderTotal(cartItems, cartItemCounts, 0.15); }} />),
        (<TextButton text='20%' key={"Tip 3"} onPress={() => { setTipMultiplier(0.2); updateOrderTotal(cartItems, cartItemCounts, 0.2); }} />),
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

    /**
     * Gets menu items with the given tag from the api
     * @param tag 
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

    /**
     * Updates the total price on an order
     * @param updatedCartItems 
     * @param updatedCartItemCounts 
     * @param tipMulti 
     * @param discountMulti 
     */
    function updateOrderTotal(updatedCartItems: MenuItem[] = cartItems, updatedCartItemCounts: number[] = cartItemCounts, tipMulti: number = tipMultiplier, discountMulti: number = discountMultiplier) {
        let updatedSubtotal = 0;
        updatedCartItems.forEach((menuItem, index) => {
            if (updatedCartItemCounts.at(index) !== undefined) {
                updatedSubtotal += menuItem.price * updatedCartItemCounts.at(index)!;
            }
            else {
                updatedSubtotal += menuItem.price;
            }
        });
        setSubtotal(updatedSubtotal);
        setTip(updatedSubtotal * tipMulti);
        setTax(updatedSubtotal * taxMultiplier);
        setTotal((updatedSubtotal * (1 + tipMulti + taxMultiplier)) * discountMulti);
    }

    /**
     * Adds an item to the customer's order
     * @param menuItem menu item
     */
    function addToOrder(menuItem: MenuItem) {
        const updatedCartItems = [...cartItems];
        updatedCartItems.push(menuItem);
        setCartItems(updatedCartItems);

        const updatedCartItemCounts = [...cartItemCounts];
        updatedCartItemCounts.push(1);
        setCartItemCounts(updatedCartItemCounts);

        setMiddleRightChildren(null);
        setBottomRightChildren(null);

        updateOrderTotal(updatedCartItems, updatedCartItemCounts);
    }

    /**
     * Changes the number of items ordered at the specified index of the cart
     * @param amount amount of items
     * @param index index of item in cart
     */
    function modifyOrderAmount(amount: number, index: number) {
        const updatedCartItemCounts = [...cartItemCounts];
        updatedCartItemCounts[index] = amount;
        setCartItemCounts(updatedCartItemCounts);

        updateOrderTotal(cartItems, updatedCartItemCounts);
    }

    /**
     * Removes an item from the cart at the specified index
     * @param index 
     */
    function removeFromOrder(index: number) {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);

        const updatedCartItemCounts = [...cartItemCounts];
        updatedCartItemCounts.splice(index, 1);
        setCartItemCounts(updatedCartItemCounts);


        updateOrderTotal(updatedCartItems, updatedCartItemCounts);
    }

    /**
     * Creates the middle content that displays each menu item in a given menu item list
     * @param menuItemList List of menu items to display
     */
    function createMiddleMenuItemContent(menuItemList: MenuItem[]) {
        const middleContent = menuItemList.map((item, index) => {

            const toggleList: boolean[] = [];
            for (let i = 0; i < item.ingredients.length; i++) {
                toggleList.push(true);
            }

            return (<TextButton
                color={randomColorHex()}
                key={`${item.name}${index}`}
                text={item.name}
                onPress={() => {
                    setSelectedItem(item);

                    console.log(item.ingredients)

                    let bottomContent = item.ingredients.map((ingredient, ingredientIndex) => {
                        return (
                            <TextButton
                                toggleable
                                key={ingredient.itemName}
                                text={`Remove ${ingredient.itemName}`}
                                onPress={() => {
                                    toggleList[ingredientIndex] = !toggleList[ingredientIndex];
                                }}
                            />
                        )
                    });
                    const addToOrderButton = <TextButton
                        key={"Add to Order"}
                        text={`Add to Order`}
                        color='#0077FF'
                        onPress={() => {
                            const ingredientList: Ingredient[] = [];
                            const removedIngredientList: Ingredient[] = [];

                            item.ingredients.forEach((ingredient, ingredientIndex) => {
                                if (toggleList[ingredientIndex]) {
                                    ingredientList.push(ingredient);
                                }
                                else {
                                    removedIngredientList.push(ingredient);
                                }
                            });

                            const copiedItem: MenuItem = {
                                ...item,
                                ingredients: ingredientList,
                                removedIngredients: removedIngredientList,
                            }

                            console.log(copiedItem);

                            addToOrder(copiedItem);
                            setSelectedItem(undefined);
                        }}
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
                                    <td className='w-[40%]'>Item Name</td>
                                    <td className=''>Price</td>
                                    <td className=''>Qty</td>
                                    <td className=''>Total</td>
                                    <td className='text-center'>Delete</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartItems.map((item, index) => {
                                        return (
                                            <>
                                                <tr key={`${item.name}${index}`}>
                                                    <td className='pr-2'><strong>{item.name}</strong></td>
                                                    <td className='pr-2'>{`$${item.price.toFixed(2)}`}</td>
                                                    <td className='pr-2'>
                                                        <Dropdown>
                                                            <Dropdown.Toggle className='text-black' variant='primary'>
                                                                {cartItemCounts.at(index)}
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => modifyOrderAmount(1, index)}>1</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => modifyOrderAmount(2, index)}>2</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => modifyOrderAmount(3, index)}>3</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => modifyOrderAmount(4, index)}>4</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => modifyOrderAmount(5, index)}>5</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => modifyOrderAmount(6, index)}>6</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>
                                                    <td>{`$${(item.price * cartItemCounts.at(index)!).toFixed(2)}`}</td>
                                                    <td>
                                                        <TextButton
                                                            customClassName='w-[50%] ml-[25%] rounded-md h-full'
                                                            text='X'
                                                            color='#F77'
                                                            hoverColor='#F00'
                                                            onPress={() => removeFromOrder(index)}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <ul>
                                                            {
                                                                item.removedIngredients?.map((item, index) => {
                                                                    return (
                                                                        <li key={index}>
                                                                            {`No ${item.itemName}`}
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </>
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
                                <li>Tip:</li>
                                <li>Tax:</li>
                                <li>Total:</li>
                            </ul>
                            <ul>
                                <li>{`\$${subtotal.toFixed(2)}`}</li>
                                <li>{`\$${tip.toFixed(2)}${tipMultiplier != 0 ? ` (${(tipMultiplier) * 100}%)` : ""}`}</li>
                                <li>{`\$${tax.toFixed(2)} (5%)`}</li>
                                <li>{`\$${total.toFixed(2)}`}</li>
                            </ul>
                        </div>
                        <TextButton text='Cancel Order' onPress={() => {
                            setCartItems([]);
                            setCartItemCounts([]);
                            setSelectedItem(undefined);
                            setMiddleRightChildren(null);
                            setBottomRightChildren(null);
                            updateOrderTotal([], []);
                        }} />
                        <TextButton
                            text='Pay'
                            color='#3de8e0'
                            onPress={async () => {
                                const items: MenuItem[] = []
                                cartItems.forEach((item, index) => {
                                    for (let i = 0; i < cartItemCounts.at(index)!; i++) {
                                        items.push(item);
                                    }
                                });

                                const order: Order = {
                                    timestamp: new Date(),
                                    items: items,
                                    total: total,
                                    submittedBy: {
                                        id: 1,
                                        firstName: "KIOSK",
                                        lastName: "KIOSK",
                                        role: "Employee",
                                    }
                                }

                                await fetch("/api/orders", { method: "POST", body: JSON.stringify(order) })
                                    .then((response) => response.json())
                                    .then(() => {
                                        setCartItems([]);
                                    })
                                    .catch((err) => alert(`Issue occured while requesting post to server ${err}`));
                                setCartItems([]);
                                setCartItemCounts([]);
                                setSelectedItem(undefined);
                                setMiddleRightChildren(null);
                                setBottomRightChildren(null);
                                updateOrderTotal([], []);
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
                            hoverColor='#fffde0'
                        />
                        <TextButton
                            text='Savory Crepes'
                            onPress={() => createMiddleMenuItemContent(savoryCrepes)}
                            key={"savoryCrepeButton"}
                            color='#f53e1d'
                            hoverColor='#ff765e'
                        />
                        <TextButton
                            text='Waffles'
                            onPress={() => createMiddleMenuItemContent(waffles)}
                            key={"waffleButton"}
                            color='#fabb0f'
                            hoverColor='#ffe294'
                        />
                        <TextButton
                            text='Soups'
                            onPress={() => createMiddleMenuItemContent(soups)}
                            key={"soupsButton"}
                            color='#d411f2'
                            hoverColor='#ef95fc'
                        />
                        <TextButton
                            text='Drinks'
                            onPress={() => createMiddleMenuItemContent(drinks)}
                            key={"drinkButton"}
                            color='#38fff2'
                            hoverColor='#d4faf7'
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
                    <h2 className='text-center text-2xl border-gray-500 border-y-2'>{`Options`}</h2>
                    <div className='grid grid-cols-5 grid-rows-3 gap-2 px-4 py-2 flex-1'>
                        {middleRightChildren}
                    </div>
                </div>
                <div className='col-span-2 flex flex-col bg-white'>
                    <h2 className='text-center text-2xl border-gray-500 border-y-2'>{`Modifications${selectedItem ? ` (${selectedItem?.name})` : ""}`}</h2>
                    <div className='grid grid-cols-5 grid-rows-3 gap-2 px-4 py-2 flex-1'>
                        {bottomRightChildren}
                    </div>
                </div>
            </div>

        </div>
    )
}
