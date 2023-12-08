import React, { useEffect, useState } from 'react';
import TextButton from './TextButton';
import { InventoryItem, MenuItem } from '../types';

/**
 * Creates a table for inventory items
 */
export default function TableInventoryItems({ dataType, api, backgroundColor }: {
    dataType?: string,
    api?: string, // endpoint
    backgroundColor?: string
}) {

    //handle for getting all the data
    const [data, setData] = useState<Array<any>>([]);

    //handle for adding a new item
    const [name, setName] = useState('');
    const [newStock, setStock] = useState('');
    const [newReorderThreshold, setReorderThreshold] = useState('');

    //handle updating/editing values
    const [editId, usetEditId] = useState<number>(-1);
    const [uname, usetName] = useState<string>('');
    const [uStock, usetStock] = useState<string>('');
    const [uReorderThreshold, usetReorderThreshold] = useState<string>('');
    

    const fetchInventoryItems = async () => {
        try {
            const result = await fetch("/api/inventory");
            const allItems = await result.json();
            console.log(allItems);
            //console.log("Fetched data:", allItems);
            setData(allItems);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    //initially set page and get data
    useEffect(() => {
        fetchInventoryItems();
      
    }, []);


    const handleEdit = (id: number) => {
        usetEditId(id);
    }

   

    return (
        <div style={{ padding: '50px 10%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ margin: '10px', width: '100%' }}>
                <form action="" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <input  type="text" placeholder='Enter Name' style={{ width: '23%', padding: '5px', marginBottom: '10px', border: "1px solid #000" }} onChange={e => setName(e.target.value)} />
                    <input type="text" placeholder='Enter Stock' style={{ width: '23%', padding: '5px', marginBottom: '10px', border: "1px solid #000" }} onChange={e => setStock(e.target.value)} />
                    <input type="text" placeholder='Enter Restock' style={{ width: '23%', padding: '5px', marginBottom: '10px', border: "1px solid #000" }} onChange={e => setReorderThreshold(e.target.value)} />
                    <TextButton
                        text='Add an Inventory Item'
                        onPress={async () => {
                            //create new menu item 
                            console.log(data);
                            const highestId = Math.max(...data.map(item => item.id), 0);
                            event?.preventDefault();
                            const newInventoryItem: InventoryItem = {
                                id: highestId +1, //the new id is just 1 higher than the current highest lol (need to do this so we can key the menu tag item)
                                name: name,
                                currentStock: Number(newStock),
                                reorderThreshold: Number(newReorderThreshold)
                            }
                            console.log(newInventoryItem);
                            //adds a new menu item
                            await fetch("/api/inventory", { method: "POST", body: JSON.stringify(newInventoryItem) })
                                .catch((err) => alert(`Issue occured while requesting post to server ${err}`));
                           
                            fetchInventoryItems();   
                        }}
                        color='#FF9638'
                        hoverColor='#FFC38E'
                        
                    />
                </form>
            </div>
            <table style={{
                border: '1px black solid',
                borderCollapse: 'collapse',
                width: '100%',
                textAlign: 'center',
            }}>
                <thead>
                    <tr style={{ border: '1px solid black', background: backgroundColor }}>
                        <th id='google-translate-element'>ID</th>
                        <th id='google-translate-element'>Item Name</th>
                        <th id='google-translate-element'>Stock</th>
                        <th id='google-translate-element'>Reorder Threshold</th>
                        <th id='google-translate-element'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((inventoryItem, index) => (
                        inventoryItem.id === editId ?
                            <tr key={`Table Row ${index}`}>
                                <td id='google-translate-element'>{inventoryItem.id}</td>
                                <td id='google-translate-element'><input type="text" placeholder={inventoryItem.name} style={{ width: '23%', padding: '5px', marginBottom: '10px', border: "1px solid #000" }} onChange={e => usetName(e.target.value)} /></td>
                                <td id='google-translate-element'><input type="text" placeholder={inventoryItem.currentStock} style={{ width: '23%', padding: '5px', marginBottom: '10px', border: "1px solid #000" }} onChange={e => usetStock(e.target.value)} /></td>
                                <td id='google-translate-element'><input type="text" placeholder={inventoryItem.reorderThreshold} style={{ width: '23%', padding: '5px', marginBottom: '10px', border: "1px solid #000" }} onChange={e => usetReorderThreshold(e.target.value)} /></td>
                                <td id='google-translate-element'>
                                    <TextButton
                                        text='Update'
                                        onPress={async () => {
                                            let updatedName = uname;
                                            let updatedStock = uStock;
                                            let updatedReorderthreshold= uReorderThreshold;
                                            console.log(uname);
                                            if (uname == '' || uname == inventoryItem.name) {
                                                updatedName = inventoryItem.name;
                                            }
                                            if (uStock == '' || uStock == inventoryItem.price) {
                                                updatedStock = inventoryItem.currentStock;
                                            }
                                            if (uReorderThreshold == '' || uReorderThreshold == inventoryItem.reorderThreshold) {
                                                updatedReorderthreshold = inventoryItem.reorderThreshold;
                                            }

                                            const updateInventoryItem: InventoryItem = {
                                                id: inventoryItem.id,
                                                name: updatedName,
                                                currentStock: Number(updatedStock),
                                                reorderThreshold: Number(updatedReorderthreshold)
                                            }
                                            console.log(updateInventoryItem);
                                            await fetch(`/api/inventory?update=${encodeURIComponent(editId)}`, { method: "POST", body: JSON.stringify(updateInventoryItem) })
                                            usetEditId(-1);
                                            usetName('');
                                            usetStock('');
                                            usetReorderThreshold('');
                                            fetchInventoryItems();
                                        }}
                                        color='#FF9638'
                                        hoverColor='#FFC38E'
                                    /></td>
                            </tr> :
                            <tr key={`Table Row ${index}`} style={{ border: '1px solid black', background: backgroundColor }}>
                                <td id='google-translate-element'>{inventoryItem.id}</td>
                                <td id='google-translate-element'>{inventoryItem.name}</td>
                                <td id='google-translate-element'>{inventoryItem.currentStock}</td>
                                <td id='google-translate-element'>{inventoryItem.reorderThreshold}</td>
                                <td id='google-translate-element'>
                                    {/* <button onClick={() => handleEdit(inventoryItem.id)} style = {{border: "1px solid #000"}}>edit</button> */}
                                    <TextButton
                                        text='Edit'
                                        onPress={async () => {
                                            handleEdit(inventoryItem.id)
                                        }}
                                        color='#FF9638'
                                        hoverColor='#FFC38E'

                                    />
                              
                                    <TextButton
                                        text='Delete'
                                        onPress={async () => {
                                            await fetch(`/api/inventory?delete=${encodeURIComponent(inventoryItem.id)}`, { method: "POST", body: JSON.stringify(inventoryItem) })
                                                .then((response) => response.json())
                                                .catch((err) => alert(`Issue occured while requesting post to server ${err}`));
                                            //window.location.reload();
                                            fetchInventoryItems();
                                 
                                        }}
                                        color='#FF9638'
                                        hoverColor='#FFC38E'

                                    />
                                </td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
