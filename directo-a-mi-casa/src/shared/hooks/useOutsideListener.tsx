import { useRef, useEffect } from 'react';
import { Subject } from 'rxjs';

export const useOutsideListener = (ref: any) => {

    const outsideListener = useRef(new Subject());

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                outsideListener.current.next(event);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref.current]);

    return {
        outsideListener$: outsideListener.current
    }
}