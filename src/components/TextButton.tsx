import React, { useEffect, useState } from 'react'
import { calculateHexLuminosity } from '../helpers/colorUtils';

export default function TextButton({ text, onPress, color, hoverColor, customClassName }:
    {
        text?: string,
        onPress?: () => void,
        color?: string,
        hoverColor?: string,
        textColor?: string,
        customClassName?: string,
    }) {
    const [hover, setHover] = useState<boolean>();
    const [textColor, setTextColor] = useState<string>("#000");

    useEffect(() => {
        const luminosity = hover ? calculateHexLuminosity(color ?? "#999") : calculateHexLuminosity(hoverColor ?? "#DDD");
        if (luminosity < 127) {
            setTextColor("#FFF");
        }
        else {
            setTextColor("#000");
        }
    }, [hover]);

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
