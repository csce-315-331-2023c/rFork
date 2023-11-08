import React, { useState } from 'react'

export default function TextButton({ text, onPress, color, hoverColor }:
    {
        text?: string,
        onPress?: () => void,
        color?: string,
        hoverColor?: string,
    }) {
    const [hover, setHover] = useState<boolean>();

    return (
        <button
            className='h-full w-full text-center rounded-xl'
            onClick={onPress ?? (() => console.log("Button Pressed"))}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                backgroundColor: hover ? (hoverColor ?? "#DDD") : (color ?? "#999")
            }}
        >
            {text}
        </button>
    )
}
