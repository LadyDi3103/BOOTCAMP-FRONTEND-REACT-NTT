// Lógica para manejo del carrito
let cartCount = 0;
const cartBadge = document.querySelector('.cart-badge');

// Función para actualizar el contador del carrito
export const updateCartBadge = () => {
    cartBadge.textContent = cartCount;
    
    if (cartBadge) {
        cartBadge.style.display = cartCount > 0 ? 'flex' : 'none';
    } else {
        console.warn('El elemento cartBadge no está definido.');
    }
};

// Lógica para agregar productos al carrito
export const handleAddToCart = () => {
    cartCount += 1;

    updateCartBadge();
};

export const initializeCartButtons = () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', handleAddToCart);
    });
};
