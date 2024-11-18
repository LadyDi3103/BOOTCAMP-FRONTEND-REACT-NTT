"# BOOTCAMP-FRONTEND-REACT-NTT"

<p align="center">
<img src="https://raw.githubusercontent.com/LadyDi3103/BOOTCAMP-FRONTEND-REACT-NTT/45f8dd60902ae3f31f7e03740a1c8394dfd5d94e/src/assets/images/logos/logo_desktop.svg" alt="logo-pequeño"  height="350" width ="500">
</p>

<p align="center">
  <h1 align="center">DirectoAMiCasa - Mini Market</h1>
</p>

## Índice

* [1. Introducción](#1-Introducción)
* [2. Estructura del proyecto](#2-Estructura-del-proyecto)
* [3. Funciones y componentes](#3-objetivos-de-aprendizaje)
* [4. Historias de usuario](#4-historias-de-usuario)
* [5. Despliegue](#5-despliegue)
* [6. Equipo de Desarrollo](#6-Equipo-de-desarrollo)

## 1. Introducción

DirectoAMiCasa es una plataforma de e-commerce enfocada en brindar a los usuarios la mejor experiencia al realizar compras desde la comodidad de su hogar. Utilizamos Vanilla JavaScript, HTML5, y CSS3, incorporando buenas prácticas de modularidad y reutilización de código.

Este proyecto es parte del Bootcamp Frontend React NTT, donde se exploran conceptos básicos y avanzados de desarrollo web con integración de APIs.

## 2. Estructura del proyecto

La siguiente es la estructura del proyecto DirectoAMiCasa. Cada carpeta y archivo tiene una función específica que contribuye al desarrollo modular y escalable de la aplicación. Esta estructura garantiza que el proyecto sea fácil de navegar y mantener.

📂 BOOTCAMP-FRONTEND-REACT-NTT
├── 📂 directo-a-mi-casa
│   ├── 📂 node_modules
│   ├── 📂 src
│   │   ├── 📂 assets
│   │   │   ├── 📂 images
│   │   │   │   ├── 📂 carousel            # Imágenes del carrusel
│   │   │   │   ├── 📂 categories          # Imágenes de categorías
│   │   │   │   ├── 📂 frutas              # Imágenes de productos/frutas
│   │   │   │   ├── 📂 icons               # Íconos utilizados en el sitio
│   │   │   │   ├── 📂 logos               # Logotipos de la aplicación
│   │   │   │   └── 📄 estructura.png      # Imagen de referencia de estructura
│   │   ├── 📂 components
│   │   │   ├── 📄 cartHandler.js          # Lógica para manejar el carrito de compras
│   │   │   ├── 📄 categoryDropdown.js     # Renderiza y gestiona el dropdown de categorías
│   │   │   ├── 📄 renderCategories.js     # Funciones para renderizar las categorías
│   │   │   └── 📄 renderProducts.js       # Funciones para renderizar los productos
│   │   ├── 📂 css
│   │   │   └── 📄 styles.css              # Estilos principales del proyecto
│   │   ├── 📂 js
│   │   │   ├── 📂 api
│   │   │   │   ├── 📄 fetchCategories.js  # Fetch de categorías desde la API
│   │   │   │   └── 📄 fetchProducts.js    # Fetch de productos desde la API
│   │   │   └── 📄 main.js                 # Punto de entrada principal de la aplicación
│   │   ├── 📂 utils
│   │   │   ├── 📄 helpers.js              # Funciones auxiliares para tareas generales
│   │   │   └── 📄 uiHelpers.js            # Funciones auxiliares para manipulación de UI
├── 📄 README.md                           # Documentación principal del proyecto
├── 📄 .gitignore                          # Archivos y carpetas a ignorar por Git
├── 📄 counter.js                          # Ejemplo de archivo de prueba
├── 📄 index.html                          # Archivo HTML principal
├── 📄 package-lock.json                   # Detalle de dependencias
└── 📄 package.json                        # Información del proyecto y dependencias


## 3. Funciones y Componentes

### Renderización de Productos
Ubicado en `components/renderProducts.js`, esta función permite renderizar dinámicamente productos desde el servicio `dummyjson`.

**Beneficio:** Modularidad y reutilización.

#### Lógica Principal:
- Elimina productos anteriores del contenedor.
- Genera dinámicamente cada producto en formato `card`.
- Incluye un botón para agregar al carrito.

---

### Manejo de Categorías
El archivo `components/categoryDropdown.js` se encarga de cargar y filtrar categorías dinámicamente.

#### Función Principal:
Permitir que los usuarios filtren productos por categorías.

#### APIs utilizadas:
1. **Productos**
2. **Categorías**

---

### Botón de Cerrar y Restablecer Vista
La función `resetUIState` (ubicada en `utils/helpers.js`) permite regresar al estado inicial del marketplace cuando el usuario hace clic en el logo o en el botón de cerrar.

#### Uso Reutilizable:
```javascript
resetUIState(); // Para resetear la vista actual. 
```
---
## 4. Consumo de APIs

El proyecto utiliza dos servicios REST principales:

### Obtener Productos
- **URL:** [https://dummyjson.com/products](https://dummyjson.com/products)
- **Método:** `GET`
- **Función:** Obtiene la lista completa de productos.

---

### Obtener Categorías
- **URL:** [https://dummyjson.com/products/categories](https://dummyjson.com/products/categories)
- **Método:** `GET`
- **Función:** Carga el desplegable de categorías para filtrar productos.

---

### Manejador de Peticiones
El archivo `js/fetchProducts.js` contiene la lógica principal para realizar las peticiones a las APIs. Utiliza `fetch` con `async/await` para garantizar solicitudes seguras y manejar errores eficientemente.


## 5. Beneficios de la Refactorización

- **Modularidad:** Cada funcionalidad está en su propio archivo, lo que mejora la legibilidad y el mantenimiento del código.
- **Reutilización:** Componentes como `renderProducts` y `resetUIState` pueden ser utilizados en diferentes partes del proyecto.
- **Mantenibilidad:** Separar lógica y renderizado facilita el debug y la incorporación de nuevas funcionalidades.

---

## 6. Guía para Ejecutar el Proyecto

### Requisitos Previos
- Tener instalado `Node.js`.

### Clonar el repositorio:
```bash
git clone https://github.com/LadyDi3103/BOOTCAMP-FRONTEND-REACT-NTT.git
npm install
npm run dev
http://localhost:5173


