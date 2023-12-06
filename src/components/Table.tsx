import React, { useEffect, useState } from 'react';
import TextButton from './TextButton';
import { InventoryItem, MenuItem } from '../types';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.css'


export default function Table({ dataType, api, backgroundColor }: {
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

    // Function to get the tag name by menu item ID
    const getTagNameByMenuItemId = (itemId: number) => {
        const tagInfo = tagData.find(tagItem => tagItem.menu_item_id === itemId);

        return tagInfo ? tagInfo.tag_name : 'N/A';
    };

    //initially set page and get data   
    useEffect(() => {
        fetchMenuItems();
        fetchMenuTags();
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
    }


    return (
        <div style={{ padding: '50px 10%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ margin: '10px', width: '100%' }}>
                <form action="" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <input type="text" placeholder='Enter Name' style={{ width: '23%', padding: '5px', marginBottom: '10px' }} onChange={e => setName(e.target.value)} />
                    <input type="text" placeholder='Enter Price' style={{ width: '23%', padding: '5px', marginBottom: '10px' }} onChange={e => setPrice(e.target.value)} />
                    <input type="text" placeholder='Enter Image Link' style={{ width: '23%', padding: '5px', marginBottom: '10px' }} onChange={e => setImageURI(e.target.value)} />
                    <input type="text" placeholder='Enter Description' style={{ width: '23%', padding: '5px', marginBottom: '10px' }} onChange={e => setDescription(e.target.value)} />
                    <input type="text" placeholder='Enter Tag' style={{ width: '23%', padding: '5px', marginBottom: '10px' }} onChange={e => setTag(e.target.value)} />
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
                            fetchMenuItems();
                            fetchMenuTags();
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
                        <th>Entree Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Tag Name</th>
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
                                <td><input type="text" placeholder={menuItem.description} style={{ width: '23%', padding: '5px', marginBottom: '10px' }} onChange={e => usetDescription(e.target.value)} /></td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle>
                                    
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleTagChange(menuItem,"Sweet Crepes")}>Sweet Crepes</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleTagChange(menuItem,"Savory Crepes")}>Savory Crepes</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleTagChange(menuItem,"Waffles")}>Waffles</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleTagChange(menuItem,"Soups")}>Soups</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleTagChange(menuItem,"Drinks")}>Drinks</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                                <td>
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
                                            if (udesc == '' || udesc == menuItem.desc) {
                                                updatedDescription = menuItem.desc;
                                            }
                                            // if (utag == '' || utag == menuItem.tag) {
                                            //     updatedTag = menuItem.tag;
                                            // }

                                            //hacky code to fix updatedPrice if it's a decimal or integer
                                            if (!Number.isInteger(Number(uprice))) {
                                                updatedPrice = String(Number(updatedPrice) * 100);//convert decimal string back to cents for database
                                            }
                                            console.log(uname);
                                            const updatedItem: MenuItem = {
                                                id: menuItem.id,
                                                name: updatedName,
                                                price: Number(updatedPrice),
                                                ingredients: [],
                                                validExtras: [],
                                                description: updatedDescription,
                                                imageURI: updatedImageURI
                                            }
                                            await fetch(`/api/menu?edit=${encodeURIComponent(menuItem.id)}`, { method: "POST", body: JSON.stringify(updatedItem) })
                                                .then((response) => response.json())
                                                .catch((err) => alert(`Issue occured while requesting post to server ${err}`));
                                            location.reload();

                                        }}
                                        color='#FF9638'
                                        hoverColor='#FFC38E'
                                    />
                                    <TextButton
                                        text='Edit Ingredients'

                                        onPress={async () => {
                                            const updatedItem: MenuItem = {
                                                id: editId,
                                                name: uname,
                                                price: Number(parseFloat(price).toFixed),
                                                ingredients: [],
                                                validExtras: [],
                                                description: udesc,
                                                imageURI: uimageURI
                                            }
                                            //console.log(menuItem); 
                                            await fetch(`/api/menu?edit=${encodeURIComponent(editId)}`, { method: "POST", body: JSON.stringify(updatedItem) })
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
                                <td >{menuItem.description}</td>
                                <td>{getTagNameByMenuItemId(menuItem.id)}</td>
                                <td>
                                    <button onClick={() => handleEdit(menuItem.id)}>edit</button> 
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
