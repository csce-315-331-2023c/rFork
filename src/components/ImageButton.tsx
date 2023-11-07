import React, { useState } from 'react'


export default function ImageButton({ text, price, imageURI, onPress, color, hoverColor }: {
    text: string,
    price: number,
    imageURI?: string,
    onPress?: () => void,
    color?: string
    hoverColor?: string
}) {

    const [hover, setHover] = useState<boolean>(false);
    return (
        <button
            className='flex-col justify-evenly items-center rounded-xl py-4 text-2xl h-60'
            onClick={onPress ?? (() => console.log("Button Pressed"))}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                backgroundColor: hover ? (hoverColor ?? "#DDD") : (color ?? "#999"),
            }}
        >
            <p className='absolute'>{`$${(price).toFixed(2)}`}</p>
            <img alt={text} className='object-scale-down w-auto max-h-44' src='https://static.vecteezy.com/system/resources/previews/025/065/282/original/crepe-with-ai-generated-free-png.png' />
            <p>{text}</p>
        </button>
    )
}
