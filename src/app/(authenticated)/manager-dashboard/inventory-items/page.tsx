'use client'
import { CChart } from '@coreui/react-chartjs'
import React, { useEffect, useState } from 'react'
import { InventoryItem, MenuItem } from '../../../../types';
import TextButton from '../../../../components/TextButton';

const testMenuItem: MenuItem = {
    name: "TEST MENU ITEM",
    price: 12.50,
    ingredients: [{ itemId: 0, itemName: "[MENU ITEM INGREDIENT]", quantity: 5 }],
    validExtras: [],
}

export default function InventoryItemView() {
    const [inventoryNames, setInventoryNames] = useState<Array<string>>([]);
    const [inventoryAmounts, setInventoryAmounts] = useState<Array<number>>([]);
    const [inventoryRestockAmounts, setInventoryRestockAmounts] = useState<Array<number>>([]);

    useEffect(() => {
        fetch("/api/inventory").then(result => result.json()).then((data) => {
            if (typeof data == "object" && data.splice) {
                const inventoryItems = data as Array<InventoryItem>;
                const itemNames: Array<string> = [];
                const itemAmounts: Array<number> = [];
                const itemRestockAmounts: Array<number> = [];

                inventoryItems.forEach((item) => {
                    itemNames.push(item.name);
                    itemAmounts.push(item.currentStock);
                    itemRestockAmounts.push(item.reorderThreshold);
                });

                setInventoryNames(itemNames);
                setInventoryAmounts(itemAmounts);
                setInventoryRestockAmounts(itemRestockAmounts);
            }   
            else {
                alert("Data Malformed");
            }
        }).catch((err) => alert(`Error querying database: ${err}`));
    }, []);

    return (
        <div>
            <CChart
                type='bar'
                data={{
                    labels: inventoryNames,
                    datasets: [
                        {
                            label: 'Current Item Amounts',
                            backgroundColor: "#F90",
                            data: inventoryAmounts
                        },
                        {
                            label: 'Restock Amounts',
                            backgroundColor: "#F50",
                            data: inventoryRestockAmounts
                        },
                    ]
                }}
            />


<footer className='h-[10%] flex flex-row p-2 gap-10'>
                        <TextButton
                            text='Add an egg'
                            onPress={async () => {
                                const inventoryItem: InventoryItem = {
                                    id: 100,
                                    name: "super duper booper",
                                    currentStock: 500,
                                    reorderThreshold: 300
                                }
                                await fetch("/api/inventory", { method: "POST", body: JSON.stringify(inventoryItem) })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        console.log(data);
                                    })
                                    .catch((err) => alert(`Issue occured while requesting post to server ${err}`));
            
                            }}
                            color='#FF9638'
                            hoverColor='#FFC38E'
                        />
                    </footer>
        </div>
    )
}
