// Lógica para construir y renderizar la lista de productos
import {
    initializeCartButtons,
    updateCartBadge
} from '../components/cartHandler.js';
import {
    resetUIState
} from '../utils/uiHelpers.js';

export const renderProducts = (products) => {
    const container = document.getElementById('dynamic-products');
    const categoryTitleContainer = document.getElementById('category-title-container');

    if (!container || !categoryTitleContainer) {
        console.error('No se encontraron los contenedores necesarios');
        return;
    }

    // Limpiar el contenido existente
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    while (categoryTitleContainer.firstChild) {
        categoryTitleContainer.removeChild(categoryTitleContainer.firstChild);
    }
    console.log("Contenedores limpiados.");

    if (products.length > 0) {
        // Crear el contenedor de título de categoría con botón de cierre
        const categoryTitleWrapper = document.createElement('div');
        categoryTitleWrapper.className = 'category-title-wrapper';

        const categoryTitle = document.createElement('h1');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = `Categoría: ${products[0].category}`;

        const closeButton = document.createElement('button');
        closeButton.className = 'close-btn';
        const closeIcon = document.createElement('img');
        closeIcon.src = 'src/assets/images/icons/close-icon.svg';
        closeIcon.alt = 'Cerrar';
        closeButton.appendChild(closeIcon);

        // Evento para ocultar la categoría
        closeButton.addEventListener('click', () => {
            resetUIState();
        });

        // Ensamblar el título y el botón de cierre
        categoryTitleWrapper.appendChild(categoryTitle);
        categoryTitleWrapper.appendChild(closeButton);

        categoryTitleContainer.appendChild(categoryTitleWrapper);
    }

    // Si no hay productos, mostrar un mensaje
    if (products.length === 0) {
        const noProductsMessage = document.createElement('p');
        noProductsMessage.className = 'no-products-message';
        noProductsMessage.textContent = 'No se encuentra disponible el producto...';
        container.appendChild(noProductsMessage);
        return;
    }

    // Crear y añadir cada producto a la lista
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        // Imagen
        const img = document.createElement("img");
        img.src = product.thumbnail;
        img.alt = product.title;

        // Nombre del producto
        const productName = document.createElement("p");
        productName.textContent = product.title;
        productName.classList.add("product-name");

        // Contenedor del precio
        const productPriceWrapper = document.createElement("div");
        productPriceWrapper.classList.add("product-price-wrapper");

        const productPrice = document.createElement("p");
        productPrice.textContent = `S/ ${product.price.toFixed(2)}`;
        productPrice.classList.add("product-price");

        productPriceWrapper.appendChild(productPrice);

        // Botón de agregar al carrito
        const addToCartButton = document.createElement("button");
        addToCartButton.classList.add("add-to-cart");
        addToCartButton.textContent = "Agregar";

        const cartIcon = document.createElement("img");
        cartIcon.src = "src/assets/images/icons/white_car.svg";
        cartIcon.alt = "Carrito";
        cartIcon.classList.add("cart-icon");

        addToCartButton.appendChild(cartIcon);

        // Ensambla la tarjeta de producto
        productCard.appendChild(img);
        productCard.appendChild(productName);
        productCard.appendChild(productPriceWrapper);
        productCard.appendChild(addToCartButton);

        // Añade tarjeta al contenedor
        container.appendChild(productCard);
    });

    console.log("Productos renderizados correctamente en el DOM.");

    container.style.display = "grid";
    categoryTitleContainer.style.display = "block";
    initializeCartButtons();
    updateCartBadge();
};