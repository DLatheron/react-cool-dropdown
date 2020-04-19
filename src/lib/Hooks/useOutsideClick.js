import { useEffect } from "react";

export default function useOutsideClick(ref, handleOutsideClick) {
    const handleClick = event => {
        if (ref.current && !ref.current.contains(event.target)) {
            console.info('Outside');

            handleOutsideClick();
        } else {
            console.info('Inside');
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    });
}
