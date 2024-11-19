// Lógica para manejo del carrito
let cartCount: number = 0;
const cartBadge = document.querySelector('.cart-badge') as HTMLElement | null;

// Función para actualizar el contador del carrito
export const updateCartBadge = (): void => {
    if (!cartBadge) {
        console.error("El elemento 'cart-badge' no se encontró en el DOM.");
        return;
    }
    
    cartBadge.textContent = cartCount.toString();

    cartBadge.style.display = cartCount > 0 ? 'flex' : 'none';
};

// Lógica para agregar productos al carrito
export const handleAddToCart = (): void => {
    cartCount += 1;
    updateCartBadge();
};

export const initializeCartButtons = (): void => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', handleAddToCart);
    });
};
