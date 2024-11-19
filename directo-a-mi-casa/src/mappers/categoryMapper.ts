import { Category } from '../types/Category';

export function mapCategory(data: any): Category {
    return {
        name: data.name,
        url: data.url,
    };
}