import React from 'react'

type RegisterButtonProps = {
    onPress: () => void,
}

export default function RegisterButton({ onPress }: RegisterButtonProps): React.JSX.Element {
    return (
        <button onClick={onPress ?? (() => console.log("Button Pressed"))}>

        </button>
    )
}
