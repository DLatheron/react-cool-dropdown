import { useEffect } from "react";

export default function useOutsideClick(ref, handleOutsideClick, enabled = true) {
    useEffect(() => {
        const handleClick = event => {
            if (ref.current && !ref.current.contains(event.target)) {
                console.info('useOutsideClick: Outside Click Detected...');

                handleOutsideClick();
            } else {
                console.info('useOutsideClick: Inside Click Detected...');
            }
        };

        if (!enabled) {
            console.info('useOutsideClick: Disabled');
            return;
        }

        console.info('useOutsideClick: Enabled');

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [ref, handleOutsideClick, enabled]);
}
