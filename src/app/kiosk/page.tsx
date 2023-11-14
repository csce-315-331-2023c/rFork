'use client'
import React, { useEffect, useState } from 'react'
import "../../css/index.css"
import KioskButton from '../../components/ImageButton'
import { MenuItem } from '../../types';
import PageLoading from '../../components/PageLoading';
import TextButton from '../../components/TextButton';
import Link from 'next/link';
import { Modal } from 'react-bootstrap';

export default function Kiosk() {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) return <PageLoading />;

    const enum Direction {
        LEFT,
        RIGHT,
        BOTH,
        NONE,
    }

    function KioskNavButton({ text, borderDirection, onPress }: { text: string, borderDirection?: Direction, onPress: () => any }): React.JSX.Element {
        const [extraClasses, setExtraClasses] = useState<string>("");
        const [borderClasses, setBorderClasses] = useState<string>("");

        useEffect(() => {
            switch (borderDirection) {
                case Direction.LEFT:
                    setBorderClasses("border-black border-l-2");
                    break;
                case Direction.RIGHT:
                    setBorderClasses("border-black border-r-2");
                    break;
                case Direction.BOTH:
                    setBorderClasses("border-black border-x-2");
                    break;
                default:
                    break;
            }
        }, [borderDirection]);

        return (
            <button
                onClick={onPress}
                className={`border-gray-700 px-4 h-full text-xl ${extraClasses} ${borderClasses}`}
                onMouseEnter={() => setExtraClasses("underline")}
                onMouseLeave={() => setExtraClasses("")}
            >
                {text}
            </button>
        );
    }

    return (
        <div className='flex-col'>
            {/* Navbar */}
            <nav className='flex flex-row items-center justify-start p-6 w-full bg-red-500'>
                <img src='https://www.sweetparis.com/assets/logos/sweet-paris-logo.svg' className='max-h-16 mr-6' />
                <KioskNavButton onPress={() => { }} borderDirection={Direction.RIGHT} text='Sweet Crepes' />
                <KioskNavButton onPress={() => { }} borderDirection={Direction.RIGHT} text='Savory Crepes' />
                <KioskNavButton onPress={() => { }} borderDirection={Direction.RIGHT} text='Waffles' />
                <KioskNavButton onPress={() => { }} borderDirection={Direction.RIGHT} text='Soups' />
                <KioskNavButton onPress={() => { }} borderDirection={Direction.NONE} text='Drinks' />
                <div className='flex-1 flex flex-row justify-end'>
                    <TextButton text='Checkout' customClassName='h-[50%] rounded-full p-4 transition-colors delay-100' color='#007DDD' hoverColor='#0200FF' textColor='white' />
                </div>
            </nav>
            {/* Slide Menus */}
            <div className='px-10'>
                <div className='grid grid-cols-4 gap-4'>
                </div>
            </div>
        </div>
    )
}

function SweetCrepesContent() {

}
