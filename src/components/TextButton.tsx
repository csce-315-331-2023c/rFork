import React from 'react'

export default function TextButton({ text, onPress }: { text?: string, onPress?: () => void, }): React.JSX.Element {
    return (
        <button className='h-full w-full text-center rounded-xl bg-gray-400 hover:bg-gray-700' onClick={onPress ?? (() => console.log("Button Pressed"))}>
            {text}
        </button>
    )
}
