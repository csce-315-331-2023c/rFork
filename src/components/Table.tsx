import React, { useEffect, useState } from 'react';
import TextButton from './TextButton';
import { InventoryItem, MenuItem } from '../types';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.css'


/**
 * Creates a table of menu items for reports
 */
export default function Table({ dataType, api, backgroundColor }: {
    dataType?: string,
    api?: string, // endpoint
    backgroundColor?: string
}) {

    //handle for getting all the data
    const [data, setData] = useState<Array<any>>([]);
    const [tagData, setTagData] = useState<Array<any>>([]);
    const [inventoryData, setInventoryData] = useState<Array<any>>([]);

    //handle for adding a new item
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [imageURI, setImageURI] = useState('');
    const [desc, setDescription] = useState('');
    const [tag, setTag] = useState('');

    //handle updating/editing values
    const [editId, usetEditId] = useState<number>(-1);
    const [uname, usetName] = useState<string>('');
    const [uprice, usetPrice] = useState<string>('');
    const [uimageURI, usetImageURI] = useState<string>('');
    const [udesc, usetDescription] = useState<string>('');
    const [utag, usetTag] = useState<string>('');

    const fetchMenuItems = async () => {
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

    const fetchMenuTags = async () => {

        try {
            const result = await fetch("/api/menu?tag=all");
            const tagItems = await result.json();

            //console.log(tagItems);
            //console.log("Fetched tags:", tagItems.rows);
            setTagData(tagItems.rows);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    
    const fetchInventoryItems = async () => {
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
                console.log(inventoryItems);
                setInventoryData(inventoryItems);
            }
            else {
                alert("Data Malformed");
            }
        }).catch((err) => alert(`Error querying database: ${err}`));
        
        //console.log(inventoryData);
    }

    // Function to get the tag name by menu item ID
    const getTagNameByMenuItemId = (itemId: number) => {
        
        const tagInfo = tagData.find(tagItem => tagItem.menu_item_id === itemId);
        console.log(tagInfo)
        return tagInfo ? tagInfo.tag_name : 'N/A';
    };

    //initially set page and get data   
    useEffect(() => {
        fetchMenuItems();
        fetchMenuTags();
        fetchInventoryItems();
    }, []);


    const handleEdit = (id: number) => {
        usetEditId(id);
    }

    const handleTagChange = (menuItem: MenuItem, newTagName: string) => {
        console.log(menuItem);
        console.log(newTagName);
        fetch(`/api/menu?update-tag=${encodeURIComponent(newTagName)}`, { method: "POST", body: JSON.stringify(menuItem) })
            .then((response) => response.json())
            .catch((err) => alert(`Issue occured while requesting post to server ${err}`));
        // location.reload();
    }

    
    return (
        <div style={{ padding: '50px 10%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ margin: '10px', width: '100%' }}>
                <form action="" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <input id='google-translate-element' type="text" placeholder='Enter Name' style={{ width: '23%', padding: '5px', marginBottom: '10px', border: "1px solid #000" }} onChange={e => setName(e.target.value)} />
                    <input id='google-translate-element' type="text" placeholder='Enter Price' style={{ width: '23%', padding: '5px', marginBottom: '10px', border: "1px solid #000" }} onChange={e => setPrice(e.target.value)} />
                    <input id='google-translate-element' type="text" placeholder='Enter Image Link' style={{ width: '23%', padding: '5px', marginBottom: '10px', border: "1px solid #000" }} onChange={e => setImageURI(e.target.value)} />
                    <input id='google-translate-element' type="text" placeholder='Enter Description' style={{ width: '23%', padding: '5px', marginBottom: '10px', border: "1px solid #000" }} onChange={e => setDescription(e.target.value)} />
                    <input id='google-translate-element' type="text" placeholder='Enter Tag' style={{ width: '23%', padding: '5px', marginBottom: '10px', border: "1px solid #000" }} onChange={e => setTag(e.target.value)} />
                    <TextButton
                        text='Add a Menu Item'

                        onPress={async () => {
                            let newPrice = price;
                            //create new menu item 
                            //hacked price to handle integers vs strings vs decimal conversion
                            if (!Number.isInteger(Number(newPrice))) {
                                newPrice = String(Number(newPrice) * 100);//convert decimal string back to cents for database
                            }
                            console.log(data);
                            const highestId = Math.max(...data.map(item => item.id), 0);
                            event?.preventDefault();
                            console.log(highestId);
                            const newMenuItem: MenuItem = {
                                id: highestId + 1, //the new id is just 1 higher than the current highest lol (need to do this so we can key the menu tag item)
                                name: name,
                                price: Number(newPrice),
                                ingredients: [],
                                validExtras: [],
                                description: desc,
                                imageURI: imageURI
                            }
                            console.log(newMenuItem);
                            //adds a new menu item
                            fetch("/api/menu", { method: "POST", body: JSON.stringify(newMenuItem) })
                                .catch((err) => alert(`Issue occured while requesting post to server ${err}`));
                            //make seperate request to add a menu tag
                            fetch(`/api/menu?add-tag=${encodeURIComponent(tag)} `, { method: "POST", body: JSON.stringify(newMenuItem) })
                                .catch((err) => alert(`Issue occured while requesting post to server ${err}`));
                            console.log(tag);
                            await fetchMenuTags();
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
                        <th id='google-translate-element'>ID</th>
                        <th id='google-translate-element'>Entree Name</th>
                        <th id='google-translate-element'>Price</th>
                        <th id='google-translate-element'>Image</th>
                        <th id='google-translate-element'>Description</th>
                        <th id='google-translate-element'>Tag Name</th>
                        <th id='google-translate-element'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((menuItem, index) => (
                        menuItem.id === editId ?
                            <tr key={`Table Row ${index}`}>
                                <td id='google-translate-element'>{menuItem.id}</td>
                                <td id='google-translate-element'><input type="text" placeholder={menuItem.name} style={{ width: '23%', padding: '5px', marginBottom: '10px', border: "1px solid #000" }} onChange={e => usetName(e.target.value)} /></td>
                                <td id='google-translate-element'><input type="text" placeholder={menuItem.price} style={{ width: '23%', padding: '5px', marginBottom: '10px', border: "1px solid #000" }} onChange={e => usetPrice(e.target.value)} /></td>
                                <td id='google-translate-element'><input type="text" placeholder={menuItem.imageURI} style={{ width: '23%', padding: '5px', marginBottom: '10px', border: "1px solid #000" }} onChange={e => usetImageURI(e.target.value)} /></td>
                                <td id='google-translate-element'><input type="text" placeholder={menuItem.description} style={{ width: '23%', padding: '5px', marginBottom: '10px', border: "1px solid #000" }} onChange={e => usetDescription(e.target.value)} /></td>
                                <td id='google-translate-element'>
                                    <Dropdown>
                                        <Dropdown.Toggle>

                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleTagChange(menuItem, "Sweet Crepes")}>Sweet Crepes</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleTagChange(menuItem, "Savory Crepes")}>Savory Crepes</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleTagChange(menuItem, "Waffles")}>Waffles</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleTagChange(menuItem, "Soups")}>Soups</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleTagChange(menuItem, "Drinks")}>Drinks</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                                <td id='google-translate-element'>
                                    <TextButton
                                        text='Update'
                                        onPress={async () => {
                                            let updatedName = uname;
                                            let updatedPrice = uprice;
                                            let updatedDescription = udesc;
                                            let updatedImageURI = uimageURI;
                                            let updatedTag = utag;
                                            console.log(uname);
                                            if (uname == '' || uname == menuItem.name) {
                                                updatedName = menuItem.name;
                                            }
                                            if (uprice == '' || uprice == menuItem.price) {
                                                updatedPrice = menuItem.price;
                                            }
                                            if (uimageURI == '' || uimageURI == menuItem.imageURI) {
                                                updatedImageURI = menuItem.imageURI;
                                            }
                                            
                                            if (udesc == '' || udesc == menuItem.description) {
                                                updatedDescription = menuItem.description;
                                            }
                                            console.log(udesc)
                                            console.log(updatedDescription)
                                            // if (utag == '' || utag == menuItem.tag) {
                                            //     updatedTag = menuItem.tag;
                                            // }

                                            //hacky code to fix updatedPrice if it's a decimal or integer
                                            //console.log(uprice);
                                            // if (!Number.isInteger(Number(uprice))) {
                                            //     updatedPrice = String(Number(updatedPrice) * 100);//convert decimal string back to cents for database
                                            // }else if(Number(updatedPrice)%1!=0){
                                            //     updatedPrice = String(Number(updatedPrice)*100);
                                            // }
                                            //console.log(updatedPrice);
                                            
                                            //console.log(uname);
                                            const updatedItem: MenuItem = {
                                                id: menuItem.id,
                                                name: updatedName,
                                                price: Number(updatedPrice)*100,
                                                ingredients: [],
                                                validExtras: [],
                                                description: updatedDescription,
                                                imageURI: updatedImageURI
                                            }
                                            console.log(updatedItem);
                                            await fetch(`/api/menu?edit=${encodeURIComponent(menuItem.id)}`, { method: "POST", body: JSON.stringify(updatedItem) })
                                                .then((response) => response.json())
                                                .catch((err) => alert(`Issue occured while requesting post to server ${err}`));
                                            usetEditId(-1);
                                            usetDescription('');
                                            usetName('');
                                            usetPrice('');
                                            usetImageURI('');
                                            fetchMenuItems();
                                            fetchMenuTags();
                                            fetchInventoryItems();
                                        }}
                                        color='#FF9638'
                                        hoverColor='#FFC38E'
                                    />

                                    
                                    <TextButton
                                        text='Edit Ingredients'
                                        onPress={async () => {
                                            location.replace(`/manager-dashboard/menu-items/editor?id=${menuItem.id}`);
                                        }}
                                        color='#FF9638'
                                        hoverColor='#FFC38E'
                                        
                                    /></td>
                                
                            </tr> :
                           
                            <tr key={`Table Row ${index}`} style={{ border: '1px solid black', background: backgroundColor }}>
                                <td id='google-translate-element'>{menuItem.id}</td>
                                <td id='google-translate-element'>{menuItem.name}</td>
                                <td id='google-translate-element'>${menuItem.price.toFixed(2)}</td>
                                <td>
                                    <img src={menuItem.imageURI} style={{ maxWidth: '100px', maxHeight: '100px' }} alt={menuItem.name} />
                                </td>
                                <td id='google-translate-element'>{menuItem.description}</td>
                                <td id='google-translate-element'>{getTagNameByMenuItemId(menuItem.id)}</td>
                                <td id='google-translate-element'>
                                    {/* <button  style = {{border: "1px solid #000"}} onClick={() => handleEdit(menuItem.id)}>edit</button> */}
                                    <TextButton
                                        text='Edit'
                                        onPress={async () => {
                                            handleEdit(menuItem.id)
                                        }}
                                        color='#FF9638'
                                        hoverColor='#FFC38E'

                                    />
                                    <TextButton
                                        text='Delete'
                                        onPress={async () => {
                                            //console.log(menuItem); 
                                            await fetch(`/api/menu?delete=${encodeURIComponent(menuItem.id)}`, { method: "POST", body: JSON.stringify(menuItem) })
                                                .then((response) => response.json())
                                                .catch((err) => alert(`Issue occured while requesting post to server ${err}`));
                                            //window.location.reload();
                                            fetchMenuItems();
                                            fetchMenuTags();
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
