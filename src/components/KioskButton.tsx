import React from 'react'

type KioskButtonProps = {
    text: string,
    imageURI?: string,
    onPress?: () => void,
}

export default function KioskButton({ text, imageURI, onPress }: KioskButtonProps) {
    return (
        <button className='flex-row bg-slate-600' onClick={onPress ?? (() => console.log("Button Pressed"))}>
            {text}
        </button>
    )
}
