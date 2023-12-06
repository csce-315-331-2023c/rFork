import React, { useEffect, useState } from 'react'
import { calculateHexLuminosity } from '../helpers/colorUtils';

export default function TextButton({ text, onPress, color, hoverColor, customClassName, toggleable }:
    {
        text?: string,
        onPress?: () => void,
        color?: string,
        hoverColor?: string,
        textColor?: string,
        customClassName?: string,
        toggleable?: boolean
    }) {
    const [hover, setHover] = useState<boolean>(false);
    const [textColor, setTextColor] = useState<string>("#000");

    const [toggled, setToggled] = useState<boolean>(false);

    useEffect(() => {
        const luminosity = hover ? calculateHexLuminosity(hoverColor ?? "#DDD") : calculateHexLuminosity(color ?? "#999");
        if (luminosity < 140) {
            setTextColor("#FFF");
        }
        else {
            setTextColor("#111");
        }
    }, [hover]);

    return (
        <button
            aria-label={`${text} button`}
            id='google-translate-element'
            className={customClassName ? customClassName : 'h-full w-full text-center text-lg rounded-xl drop-shadow-md'}
            onClick={() => {
                if (onPress) {
                    onPress();
                }
                if (toggleable) {
                    setToggled(!toggled);
                }
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                backgroundColor: hover || toggled ? (hoverColor ?? "#DDD") : (color ?? "#999"),
                color: textColor ?? "#000",
            }}
        >
            {text}
        </button>
    )
}
