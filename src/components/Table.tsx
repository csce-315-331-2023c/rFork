import React, { useEffect, useState } from 'react';
import TextButton from '../components/TextButton';
import { InventoryItem, MenuItem } from '../types';

export default function Table({ dataType, api, backgroundColor }: {
    dataType?: string,
    api?: string, // endpoint
    backgroundColor?: string
}) {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [imageURI, setImageURI] = useState('');
    const [desc, setDescription] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch("/api/menu");
                const allItems = await result.json();
                console.log(allItems);
                console.log("Fetched data:", allItems);
                setData(allItems);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [api]);

    
    return (
        <div style={{ padding: '50px 10%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ margin: '10px', width: '100%' }}>
                <form action="" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <input type="text" placeholder='Enter Name' style={{ width: '23%', padding: '5px', marginBottom: '10px' }} onChange={e => setName(e.target.value)} />
                    <input type="text" placeholder='Enter Price' style={{ width: '23%', padding: '5px', marginBottom: '10px' }} onChange={e => setPrice(e.target.valueAsNumber)}/>
                    <input type="text" placeholder='Enter Image Link' style={{ width: '23%', padding: '5px', marginBottom: '10px' }} onChange={e => setImageURI(e.target.value)}/>
                    <input type="text" placeholder='Enter Description' style={{ width: '23%', padding: '5px', marginBottom: '10px' }} onChange={e => setDescription(e.target.value)}/>
                    <TextButton
                            text='Add a Menu Item'
                            onPress={async () => {
                                const menuItem: MenuItem = {
                                    name: name,
                                    price: price,
                                    ingredients: [],
                                    validExtras: [],
                                    description: desc,
                                    imageURI: imageURI
                                }
                                await fetch("/api/menu", { method: "POST", body: JSON.stringify(menuItem) })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        console.log(data);
                                    })
                                    .catch((err) => alert(`Issue occured while requesting post to server ${err}`));
            
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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((menuItem, index) => (
                        <tr key={index} style={{ border: '1px solid black', background: backgroundColor }}>
                            <td>{menuItem.id}</td>
                            <td>{menuItem.name}</td>
                            <td>${menuItem.price.toFixed(2)}</td>
                            <td>
                                <img src={menuItem.imageURI} style={{ maxWidth: '100px', maxHeight: '100px' }} alt= {menuItem.name} />
                            </td>
                            <td>{menuItem.description}</td>
                            <td>
                                <button>edit</button>
                                <button>delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
