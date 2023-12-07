'use client'
import { CChart } from '@coreui/react-chartjs'
import React, { useEffect, useState } from 'react'
import { InventoryItem, MenuItem } from '../../../../types';
import TextButton from '../../../../components/TextButton';
import TableInventoryItems from '../../../../components/TableInventoryItems';
import AuthSessionHeader from '../../../../components/AuthSessionHeader';
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
             <AuthSessionHeader />
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
            <TableInventoryItems
                dataType='menu-items'
                backgroundColor='rgb(130,233,199)'
            />
        </div>


    )
}
