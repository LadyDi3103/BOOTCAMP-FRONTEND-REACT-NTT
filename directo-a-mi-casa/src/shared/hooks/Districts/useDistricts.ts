import { District } from "@/app/domain/District";


export const useDistricts = (): { districts: District[] } => {
    const districts: District[] = [
        { id: 1, name: 'San Isidro' },
        { id: 2, name: 'Miraflores' },
        { id: 3, name: 'Surco' },
        { id: 4, name: 'La Molina' },
    ];

    return { districts };
};