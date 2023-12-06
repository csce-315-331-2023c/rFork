'use client'
import React, { useEffect, useState } from 'react'
import "../../css/index.css"
import ImageButton from '../../components/ImageButton'
import { MenuItem, WeatherInformation } from '../../types';
import PageLoading from '../../components/PageLoading';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'

export default function MenuBoard() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Lists of different tagged menu items
    const [sweetCrepes, setSweetCrepes] = useState<Array<MenuItem>>([]);
    const [savoryCrepes, setSavoryCrepes] = useState<Array<MenuItem>>([]);
    const [waffles, setWaffles] = useState<Array<MenuItem>>([]);
    const [soups, setSoups] = useState<Array<MenuItem>>([]);
    const [drinks, setDrinks] = useState<Array<MenuItem>>([]);
    const [featuredItems, setFeaturedItems] = useState<Array<MenuItem>>([]);
    const [weatherData, setWeatherData] = useState<WeatherInformation>();

    useEffect(() => {
        getMenuItemCategory("Sweet Crepes").then((data) => setSweetCrepes(data));
        getMenuItemCategory("Savory Crepes").then((data) => setSavoryCrepes(data));
        getMenuItemCategory("Waffles").then((data) => setWaffles(data));
        getMenuItemCategory("Soups").then((data) => setSoups(data));
        getMenuItemCategory("Drinks").then((data) => setDrinks(data));
        getMenuItemCategory("Featured").then((data) => setFeaturedItems(data));
        setLoading(false);

        fetch("/api/weather").then(res => res.json()).then(data => {
            setWeatherData(data);
        });

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

    if (loading) return <PageLoading />;

    return (
        // Creating the template for Menu Board based on the sketch in miro
        <div className='flex flex-col items-center h-screen py-2'>
            <img className="h-[5%]" src='https://www.sweetparis.com/assets/logos/sweet-paris-logo.svg' />
            <Carousel
                className='bg-[#56b3ff] w-full py-2 shadow-xl'
                slide
                interval={4000}
                controls={false}
                indicators={false}
            >
                {
                    featuredItems.map((item, index) => {
                        return (
                            <Carousel.Item key={`Carousel ${item.name}`}>
                                <div className='flex flex-row items-center justify-center'>
                                    <img className='h-72 rounded-xl mx-4' src={item.imageURI} alt={item.name} />
                                    <div className='mx-4'>
                                        <h2 className='text-center text-white'>{item.name}</h2>
                                        <p className='text-center text-white'>{item.description}</p>
                                    </div>
                                </div>
                            </Carousel.Item>
                        );
                    })
                }
            </Carousel>
            <div className='flex flex-1 flex-row w-full'>
                <div className="flex flex-col flex-1 items-center px-10 h-full justify-between">
                    <h1 className='w-full text-3xl pt-6'><i>Sweet Crepes</i></h1>
                    {sweetCrepes.map((item) => (
                        <div key={item.name} className='flex flex-row justify-between w-full text-xl'>
                            <p>{item.name}</p>
                            <p>{`\$${item.price.toFixed(2)}`}</p>
                        </div>
                    ))}
                    <h1 className='w-full text-3xl pt-6 border-black border-t-2'><i>Soups (Seasonal)</i></h1>
                    {soups.map((item) => (
                        <div key={item.name} className='flex flex-row justify-between w-full text-xl'>
                            <p>{item.name}</p>
                            <p>{`\$${item.price.toFixed(2)}`}</p>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col flex-1 items-center px-10 h-full justify-between">
                    <h1 className='w-full text-3xl pt-6'><i>Savory Crepes</i></h1>
                    {savoryCrepes.map((item) => (
                        <div key={item.name} className='flex flex-row justify-between w-full text-xl'>
                            <p>{item.name}</p>
                            <p>{`\$${item.price.toFixed(2)}`}</p>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col flex-1 items-center px-10 h-full justify-between">
                    <h1 className='w-full text-3xl pt-6'><i>Waffles</i></h1>
                    {waffles.map((item) => (
                        <div key={item.name} className='flex flex-row justify-between w-full text-xl'>
                            <p>{item.name}</p>
                            <p>{`\$${item.price.toFixed(2)}`}</p>
                        </div>
                    ))}
                    <h1 className='w-full text-3xl pt-6 border-black border-t-2'><i>Beverages</i></h1>
                    {drinks.map((item) => (
                        <div key={item.name} className='flex flex-row justify-between w-full text-xl'>
                            <p>{item.name}</p>
                            <p>{`\$${item.price.toFixed(2)}`}</p>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col flex-1 items-center px-10 h-full justify-center">
                        <div className='text-3xl pb-0'>
                            {weatherData?.weather[0].description}
                        </div>
                        <img className= '' src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@4x.png`} alt="The Weather Icon" />
                        <div className='text-4xl pb-3'>
                            {(((weatherData?.temperature ?? 0) - 273.15) * 9/5 + 32).toFixed(2) + "°F"}
                        </div>
                        <div className='text-2xl pb-0'>
                            {"Feels Like: " + (((weatherData?.feelsLike ?? 0) - 273.15) * 9/5 + 32).toFixed(2) + "°F"}
                        </div>
                </div>
            </div>
        </div>
    )
}
