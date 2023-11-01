import React from 'react'

type KioskButtonProps = {
    text: string,
    price: number,
    imageURI?: string,
    onPress?: () => void,
}

export default function KioskButton({ text, price, imageURI, onPress }: KioskButtonProps) {
    return (
        <button className='flex-col justify-evenly items-center rounded-xl py-4 text-2xl h-60 hover:bg-slate-200 bg-slate-50' onClick={onPress ?? (() => console.log("Button Pressed"))}>
            <p className='absolute'>{`$${(price).toFixed(2)}`}</p>
            <img alt={text} className='object-scale-down w-auto max-h-44' src='https://static.vecteezy.com/system/resources/previews/025/065/282/original/crepe-with-ai-generated-free-png.png' />
            <p>{text}</p>
        </button>
    )
}
