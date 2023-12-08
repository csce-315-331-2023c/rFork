'use client'
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Ingredient, MenuItem } from "../../../../../types";
import AuthSessionHeader from "../../../../../components/AuthSessionHeader";
import TextButton from "../../../../../components/TextButton";
import "../../../../../css/index.css"
import { FaArrowLeft } from "react-icons/fa";

export default function Editor() {

    const searchParams = useSearchParams();
    const id = parseInt(searchParams.get("id"));
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [menuItem, setMenuItem] = useState<MenuItem>();
    const [allIngredients, setAllIngredients] = useState<Array<any>>([]);
    const [editQuantity, setEditQuantity] = useState(-1);
    const fetchMenuItems = async () => {
        try {
            const result = await fetch("/api/menu");
            const allItems = await result.json();
            allItems.forEach(item => {
                if (item.id == id) {
                    setIngredients(item.ingredients);
                    setMenuItem(item);
                }
            })
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchAllIngredients = async () => {
        try {
            const result = await fetch("/api/inventory");
            const allIngredients = await result.json();
            setAllIngredients(allIngredients);
            //console.log(allIngredients);
        } catch (error) {
            console.error("Error fetching data:", error);
        }

    };



    function addIngredient(item: Ingredient) {
        fetch(`/api/menu?add-ingredient=${encodeURIComponent(id)}`, {
            method: "POST",
            body: JSON.stringify(item),
        })
    }

    function removeIngredient(item: Ingredient) {
        fetch(`/api/menu?delete-ingredient=${encodeURIComponent(id)}`, { method: "POST", body: JSON.stringify(item) })
            .then((response) => response.json())
            .catch((err) => alert(`Issue occured while requesting post to server ${err}`));
    }

    const updateQuantity = (item: Ingredient) => {
        fetch(`/api/menu?update-ingredient=${encodeURIComponent(id)}`, {
            method: "POST",
            body: JSON.stringify(item),
        })
        console.log();

    }


    useEffect(() => {
        fetchMenuItems();
        fetchAllIngredients();
    }, []);

    return (
        <div>
            <AuthSessionHeader />
            <button aria-label="Home Page" aria-description="Button to go back to home page" onClick={() => location.replace("/manager-dashboard/menu-items")}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <FaArrowLeft />
                        <div id="google-translate-element" style={{ marginLeft: "5px" }}>Return to Menu Items</div>
                    </div>
            </button>
            <h1 className="text-2xl">{menuItem?.name}</h1>

            <div className="flex flex-row w-full">
                <div className="h-full flex-1">
                    <table>

                        <tbody>
                            {ingredients.map((ingredient, index) => {
                                return (
                                    <tr key={`ingredient ${index}`}>
                                        <td className="border text-center px-8 py-4">{ingredient.itemId}</td>
                                        <td className="border text-center px-8 py-4">{ingredient.itemName}</td>

                                        <td className="border text-center px-8 py-4">
                                            {ingredient.quantity}
                                        </td>
                                        <td className="border text-center px-8 py-4">
                                            <input className="border text-center px-8 py-4"
                                                type="number"
                                                //value="1"
                                                min ="1"
                                                onChange={(e) => {
                                                    const newQuantity = parseInt(e.target.value, 10) || 0;
                                                    setEditQuantity(newQuantity);
                                                }}
                                            />
                                        </td>
                                        <td className="border text-center px-8 py-4" > <TextButton
                                            text='Delete'
                                            onPress={async () => {
                                                // await fetch(`/api/menu?delete=${encodeURIComponent(menuItem.id)}`, { method: "POST", body: JSON.stringify(menuItem) }) //make api 
                                                //     .then((response) => response.json())
                                                //     .catch((err) => alert(`Issue occured while requesting post to server ${err}`));
                                                // //window.location.reload();

                                                removeIngredient(ingredient);
                                                //api to edit ingredient by adding
                                                fetchMenuItems();
                                                fetchAllIngredients();
                                            }}
                                            color='#FF9638'
                                            hoverColor='#FFC38E'

                                        /></td>
                                        <td className="border text-center px-8 py-4">
                                            <TextButton
                                                text='Update Quantity'
                                                onPress={() => {
                                                    const newIngredient: Ingredient = {
                                                        itemId: ingredient.itemId, 
                                                        itemName: ingredient.itemName, 
                                                        quantity: editQuantity,
                                                       
                                                    };
                                                    console.log(newIngredient);
                                                    updateQuantity(newIngredient);
                                                    fetchMenuItems();
                                                    fetchAllIngredients();
                                                }}
                                                color='#FF9638'
                                                hoverColor='#FFC38E'
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </div>

                <div className="h-full flex-1 border-black border-l-4">
                    <table>

                        <tbody>
                            {allIngredients
                                .filter(
                                    (ingredient) =>
                                        !ingredients.some(
                                            (existingIngredient) => existingIngredient.itemId === ingredient.id
                                        )
                                ).map((ingredient, index) => {
                                    return (
                                        <tr key={`ingredient ${index}`}>
                                            <td className="border text-center px-8 py-4">{ingredient.id}</td>
                                            <td className="border text-center px-8 py-4">{ingredient.name}</td>
                                            {/* <td className="border text-center px-8 py-4">{ingredient.currentStock}</td> */}
                                            <td className="border text-center px-8 py-4" > <TextButton
                                                text='Add item'
                                                onPress={async () => {
                                                    const newIngredient: Ingredient = {
                                                        itemId: ingredient.id, 
                                                        itemName: ingredient.name, 
                                                        quantity: 1,
                                                       
                                                    };
                                                    console.log(newIngredient);
                                                    addIngredient(newIngredient);
                                                    //api to edit ingredient
                                                    fetchMenuItems();
                                                    fetchAllIngredients();
                                                }}
                                                color='#FF9638'
                                                hoverColor='#FFC38E'

                                            /></td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}