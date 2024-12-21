import { useRef, useEffect, MutableRefObject } from 'react';
import { Subject } from 'rxjs';

/**
 * Hook para detectar clics fuera de un elemento específico.
 * @param ref - Referencia al elemento DOM que queremos observar.
 * @returns Un Subject que emite eventos cuando se hace clic fuera del elemento.
 */

export const useOutsideListener = (ref: MutableRefObject<HTMLElement | null>) => {

    const outsideListener = useRef<Subject<Event>>(new Subject<Event>());

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                outsideListener.current.next(event);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Desvincula el listener al desmontar el componente.
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return {
        outsideListener$: outsideListener.current
    }
}