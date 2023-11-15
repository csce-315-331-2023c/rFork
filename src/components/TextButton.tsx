import React, { useState } from 'react'

export default function TextButton({ text, onPress, color, hoverColor, textColor, customClassName }:
    {
        text?: string,
        onPress?: () => void,
        color?: string,
        hoverColor?: string,
        textColor?: string,
        customClassName?: string,
    }) {
    const [hover, setHover] = useState<boolean>();

    return (
        <button
            className={customClassName ? customClassName : 'h-full w-full text-center text-lg rounded-xl drop-shadow-md'}
            onClick={onPress ?? (() => console.log("Button Pressed"))}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                backgroundColor: hover ? (hoverColor ?? "#DDD") : (color ?? "#999"),
                color: textColor ?? "#000",
            }}
        >
            {text}
        </button>
    )
}
