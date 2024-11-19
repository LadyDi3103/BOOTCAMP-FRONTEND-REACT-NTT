export function mapProduct(data) {
    return {
        id: data.id,
        title: data.title,
        description: data.description,
        price: data.price,
        thumbnail: data.thumbnail,
        category: data.category,
    };
}