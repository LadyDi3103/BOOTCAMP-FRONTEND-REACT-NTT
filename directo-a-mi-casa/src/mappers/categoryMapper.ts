import { Category } from '../app/domain/Category';

export function mapCategory(data: Category): Category {
    return {
        name: data.name,
        url: data.url,
    };
}