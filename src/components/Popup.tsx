import React, { useEffect, useRef } from 'react';

/**
 * Creates a subwindow popup above the main page, mainly for the kiosk
 */
export default function Popup({ show, onClose, children }: React.PropsWithChildren<{
    show?: boolean,
    onClose?: () => any,
}>) {
    const oldShowValue = useRef(show);
    useEffect(() => {
        if (show !== oldShowValue.current) {
            onClose ? onClose() : console.log("Popup Closed");
        }
        oldShowValue.current = show;
    }, [show]);

    if (show) {
        return (
            <div className='fixed h-screen w-screen flex flex-col items-center justify-center bg-[#000000be]'>
                {children}
            </div>
        )
    }
    else {
        return <></>;
    }
}
