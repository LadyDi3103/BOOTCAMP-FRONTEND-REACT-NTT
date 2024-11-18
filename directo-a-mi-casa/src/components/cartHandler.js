// Lógica para manejo del carrito
let cartCount = 0;
const cartBadge = document.querySelector('.cart-badge');

// Función para actualizar el contador del carrito
export const updateCartBadge = () => {
    cartBadge.textContent = cartCount;
    
    if (cartCount > 0) {
        cartBadge.style.display = 'flex';
    } else {
        cartBadge.style.display = 'none';
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
