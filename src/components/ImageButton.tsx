import React, { useState } from 'react'


export default function ImageButton({ text, price, imageURI, onPress, color, hoverColor, altText, customClassName }: {
    text?: string,
    altText?: string,
    price?: number,
    imageURI?: string,
    onPress?: () => void,
    color?: string
    hoverColor?: string,
    customClassName?: string,
}) {

    const [hover, setHover] = useState<boolean>(false);
    return (
        <button
            aria-label={`${text} button`}
            className={customClassName ?? 'flex flex-col justify-evenly items-center rounded-xl py-4 text-2xl h-60'}
            onClick={onPress ?? (() => console.log("Button Pressed"))}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                backgroundColor: hover ? (hoverColor ?? "#DDD") : (color ?? "#999"),
            }}
        >
            <img
                alt={altText ?? text}
                className='object-scale-down w-auto max-h-44'
                src={imageURI ?? 'https://static.vecteezy.com/system/resources/previews/025/065/282/original/crepe-with-ai-generated-free-png.png'}
            />
            <p id='google-translate-element'>{text ? `${text}${price ? ` - $${(price).toFixed(2)}` : ''}` : ''}</p>
        </button>
    )
}
