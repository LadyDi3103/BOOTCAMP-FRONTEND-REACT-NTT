import { Category } from '../app/domain/Category';

export function mapCategory(data: any): Category {
    return {
        name: data.name,
        url: data.url,
    };
}