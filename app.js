// Categorías de productos
const categorias = [
    {
        id: 1,
        nombre: "Zapatillas Urbanas",
        descripcion: "Calzado moderno para el día a día",
        imagen: "images/categorias/zapatilla1.png"
    },
    {
        id: 2,
        nombre: "Zapatillas Deportivas",
        descripcion: "Diseñadas para rendimiento y comodidad",
        imagen: "images/categorias/dcshoes1.png"
    },
    {
        id: 3,
        nombre: "Zapatillas de Noche",
        descripcion: "Estilo y elegancia para salidas nocturnas",
        imagen: "images/categorias/zapatillasurbanas.png"
    },
    {
        id: 4,
        nombre: "Zapatillas Runner",
        descripcion: "Diseñadas para corredores, máximo rendimiento y comodidad",
        imagen: "/images/categorias/runner.png"
    },
    {
        id: 5,
        nombre: "Ropa Deportiva",
        descripcion: "Máximo rendimiento y comodidad",
        imagen: "/images/categorias/ropadeportiva.png"
    },
    {
        id: 6,
        nombre: "Accesorios",
        descripcion: "Complementos para completar tu estilo",
        imagen: "/images/categorias/accesorio.png"
    }
];

// Datos de productos actualizados
const products = [
    // Zapatillas Urbanas (Categoría 1)
    {
        id: 101,
        categoriaId: 1,
        name: 'Zapatilla Urban Classic',
        price: 79.99,
        image: 'images/productos/zapatilla-urban-1.png',
        descripcion: 'Diseño urbano moderno y versátil'
    },
    {
        id: 102,
        categoriaId: 1,
        name: 'Zapatilla Street Style',
        price: 89.99,
        image: 'images/productos/zapatilla-urban-2.png',
        descripcion: 'Comodidad y estilo para la ciudad'
    },
    
    // Zapatillas Deportivas (Categoría 2)
    {
        id: 201,
        categoriaId: 2,
        name: 'Running Pro',
        price: 99.99,
        image: 'images/productos/zapatilla-running-1.png',
        descripcion: 'Zapatilla de alto rendimiento para corredores'
    },
    {
        id: 202,
        categoriaId: 2,
        name: 'Trail Master',
        price: 109.99,
        image: 'images/productos/zapatilla-trail-1.png',
        descripcion: 'Diseñada para terrenos difíciles'
    },
    
    // Zapatillas de Noche (Categoría 3)
    {
        id: 301,
        categoriaId: 3,
        name: 'Night Elegance',
        price: 129.99,
        image: 'images/productos/zapatilla-noche-1.png',
        descripcion: 'Estilo sofisticado para salidas nocturnas'
    },
    
    // Ropa Casual (Categoría 4)
    {
        id: 401,
        categoriaId: 4,
        name: 'Pantalón Slim Fit',
        price: 69.99,
        image: 'images/productos/pantalon-casual-1.png',
        descripcion: 'Pantalón moderno y cómodo'
    },
    
    // Ropa Deportiva (Categoría 5)
    {
        id: 501,
        categoriaId: 5,
        name: 'Camiseta Técnica',
        price: 39.99,
        image: 'images/productos/camiseta-deportiva-1.png',
        descripcion: 'Transpirable y ligera para entrenamiento'
    },
    
    // Accesorios (Categoría 6)
    {
        id: 601,
        categoriaId: 6,
        name: 'Gorra Deportiva',
        price: 24.99,
        image: 'images/productos/gorra-1.png',
        descripcion: 'Protección y estilo en un solo accesorio'
    }
];

// Prueba de edición
const test = true;

// Carrito de compras
let cart = [];

// Elementos del DOM
const productsContainer = document.getElementById('products-container');
const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.querySelector('.close');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const cartCount = document.getElementById('cart-count');

// Renderizar categorías
function renderCategorias() {
    const categoriasContainer = document.getElementById('products-container');
    categoriasContainer.innerHTML = ''; // Limpiar contenedor

    categorias.forEach(categoria => {
        const categoriaCard = document.createElement('div');
        categoriaCard.classList.add('product', 'product-card');
        
        categoriaCard.innerHTML = `
            <img src="${categoria.imagen}" alt="${categoria.nombre}">
            <div class="product-details">
                <h3>${categoria.nombre}</h3>
                <p>${categoria.descripcion}</p>
                <button onclick="verProductosCategoria(${categoria.id})" class="btn btn-primary">
                    Ver Productos
                </button>
            </div>
        `;

        categoriasContainer.appendChild(categoriaCard);
    });
}

// Función para ver productos de una categoría
function verProductosCategoria(categoriaId) {
    const productosFiltrados = products.filter(producto => producto.categoriaId === categoriaId);
    
    const categoriasContainer = document.getElementById('products-container');
    categoriasContainer.innerHTML = ''; // Limpiar contenedor
    
    const botonVolver = document.createElement('button');
    botonVolver.textContent = 'Volver a Categorías';
    botonVolver.classList.add('btn', 'btn-secondary', 'mb-3');
    botonVolver.addEventListener('click', renderCategorias);
    categoriasContainer.appendChild(botonVolver);

    productosFiltrados.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.classList.add('product', 'product-card');
        
        productoCard.innerHTML = `
            <img src="${producto.image}" alt="${producto.name}">
            <div class="product-details">
                <h3>${producto.name}</h3>
                <p>${producto.descripcion}</p>
                <button onclick="addToCart(${producto.id})" class="btn btn-primary">
                    Añadir al Carrito
                </button>
            </div>
        `;

        categoriasContainer.appendChild(productoCard);
    });
}

// Añadir producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCart();
}

// Actualizar carrito
function updateCart() {
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>Cantidad: ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${item.id})">Eliminar</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Eliminar producto del carrito
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
    }
    updateCart();
}

// Finalizar compra
function checkout() {
    alert('¡Gracias por tu compra! Total: $' + 
        cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
    cart = [];
    updateCart();
}

// Eventos del modal
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

checkoutBtn.addEventListener('click', checkout);

// Inicialmente renderizar categorías
renderCategorias();
