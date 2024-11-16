// Lógica para construir y renderizar la lista de productos.
const productContainer = document.getElementById("product-container");

export const renderProducts = (products) => {
    // Limpiar el contenido existente
    while (productContainer.firstChild) {
        productContainer.removeChild(productContainer.firstChild);
    }
    console.log("Contenedor de productos limpiado.");
    // Crear y añadir cada categoría a la lista
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        const productTitle = document.createElement("h3");
        productTitle.textContent = product.title;

        const productImage = document.createElement("img");
        productImage.src = product.thumbnail;
        productImage.alt = product.title;

        const productDescription = document.createElement("p");
        productDescription.textContent = product.description;

        const productPrice = document.createElement("p");
        productPrice.textContent = `Precio: $${product.price}`;

        // Ensamblar la tarjeta de producto
        productCard.appendChild(productTitle);
        productCard.appendChild(productImage);
        productCard.appendChild(productDescription);
        productCard.appendChild(productPrice);

        productContainer.appendChild(productCard);
    });
    console.log("Productos renderizados correctamente en el DOM.");

    productContainer.style.display = "block";

};