import { Category } from '../types/Category';

// falta tipar
export function mapCategory(data: any): Category {
    return {
        name: data.name,
        url: data.url,
    };
}