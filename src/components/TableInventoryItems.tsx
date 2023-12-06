import React, { useEffect, useState } from 'react';
import TextButton from './TextButton';
import { InventoryItem, MenuItem } from '../types';

export default function TableInventoryItems({ dataType, api, backgroundColor }: {
    dataType?: string,
    api?: string, // endpoint
    backgroundColor?: string
}) {

    //handle for getting all the data
    const [data, setData] = useState<Array<any>>([]);
    const [tagData, setTagData] = useState<Array<any>>([]);

    //handle for adding a new item
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [imageURI, setImageURI] = useState('');

    //handle updating/editing values
    const [editId, usetEditId] = useState<number>(-1);
    const [uname, usetName] = useState<string>('');
    const [uprice, usetPrice] = useState<string>('');
    const [uimageURI, usetImageURI] = useState<string>('');
    

    const fetchInventoryItems = async () => {
        try {
            const result = await fetch("/api/menu");
            const allItems = await result.json();
            //console.log(allItems);
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
                    <input type="text" placeholder='Enter Name' style={{ width: '23%', padding: '5px', marginBottom: '10px' }} onChange={e => setName(e.target.value)} />
                    <input type="text" placeholder='Enter Stock' style={{ width: '23%', padding: '5px', marginBottom: '10px' }} onChange={e => setPrice(e.target.value)} />
                    <input type="text" placeholder='Enter Restock' style={{ width: '23%', padding: '5px', marginBottom: '10px' }} onChange={e => setImageURI(e.target.value)} />
                    <TextButton
                        text='Add an Inventory Item'
                        onPress={async () => {
                            //create new menu item 
                            console.log(data);
                            const highestId = Math.max(...data.map(item => item.id), 0);
                            event?.preventDefault();
                            console.log(highestId);
                            const newMenuItem: MenuItem = {
                                id: highestId +1, //the new id is just 1 higher than the current highest lol (need to do this so we can key the menu tag item)
                                name: name,
                                price: Number(price),
                                ingredients: [],
                                validExtras: [],
                                description: desc,
                                imageURI: imageURI
                            }
                            console.log(newMenuItem);
                            //adds a new menu item
                            await fetch("/api/menu", { method: "POST", body: JSON.stringify(newMenuItem) })
                                .catch((err) => alert(`Issue occured while requesting post to server ${err}`));
                           
                            fetchMenuItems();
                           
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
                        <th>ID</th>
                        <th>Item Name</th>
                        <th>Stock</th>
                        <th>Reorder Threshold</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((menuItem, index) => (
                        menuItem.id === editId ?
                            <tr key={`Table Row ${index}`}>
                                <td>{menuItem.id}</td>
                                <td><input type="text" placeholder={menuItem.name} style={{ width: '23%', padding: '5px', marginBottom: '10px' }} onChange={e => usetName(e.target.value)} /></td>
                                <td><input type="text" placeholder={menuItem.price} style={{ width: '23%', padding: '5px', marginBottom: '10px' }} onChange={e => usetPrice(e.target.value)} /></td>
                                <td><input type="text" placeholder={menuItem.imageURI} style={{ width: '23%', padding: '5px', marginBottom: '10px' }} onChange={e => usetImageURI(e.target.value)} /></td>
                                <td>
                                    <TextButton
                                        text='Update'
                                        onPress={async () => {
                                            const menuItem: MenuItem = {
                                                id: editId,
                                                name: uname,
                                                price: Number(uprice),
                                                ingredients: [],
                                                validExtras: [],
                                                description: udesc,
                                                imageURI: uimageURI
                                            }
                                            console.log(menuItem);
                                            await fetch(`/api/menu?edit=${encodeURIComponent(editId)}`, { method: "POST", body: JSON.stringify(menuItem) })
                                                .then((response) => response.json())
                                                .then((data) => {
                                                    //console.log(data);
                                                })
                                                .catch((err) => alert(`Issue occured while requesting post to server ${err}`));

                                        }}
                                        color='#FF9638'
                                        hoverColor='#FFC38E'
                                    /></td>
                            </tr> :
                            <tr key={`Table Row ${index}`} style={{ border: '1px solid black', background: backgroundColor }}>
                                <td>{menuItem.id}</td>
                                <td>{menuItem.name}</td>
                                <td>${menuItem.price.toFixed(2)}</td>
                                <td>
                                    <img src={menuItem.imageURI} style={{ maxWidth: '100px', maxHeight: '100px' }} alt={menuItem.name} />
                                </td>
                                <td>
                                    <button onClick={() => handleEdit(menuItem.id)}>edit</button>
                                    <TextButton
                                        text='Delete'
                                        onPress={async () => {
                                            const item: MenuItem = {
                                                id: menuItem.id,
                                                name: menuItem.name,
                                                price: menuItem.price,
                                                ingredients: [],
                                                validExtras: [],
                                                description: menuItem.description,
                                                imageURI: menuItem.imageURI
                                            }
                                            //console.log(menuItem); 
                                            await fetch(`/api/menu?delete=${encodeURIComponent(menuItem.id)}`, { method: "POST", body: JSON.stringify(menuItem) })
                                                .then((response) => response.json())
                                                .then((data) => {
                                                    //console.log(data);
                                                })
                                                .catch((err) => alert(`Issue occured while requesting post to server ${err}`));
                                            //window.location.reload();
                                            fetchMenuItems();
                                 
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
