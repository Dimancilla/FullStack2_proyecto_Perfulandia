// Espera a que la página esté lista para empezar a trabajar con el código
document.addEventListener('DOMContentLoaded', () => {

    // Guarda los perfumes que has agregado al carrito
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Esta función guarda el carrito en el navegador para que no se borre
    const guardarCarrito = () => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    };

    // Esta función dibuja el carrito en la pantalla
    const mostrarCarrito = () => {
        const listaCarrito = document.getElementById('lista-carrito');
        const totalCarritoElemento = document.getElementById('total-carrito');

        // Borra lo que ya estaba para que no se repita
        if (listaCarrito) {
            listaCarrito.innerHTML = '';
        }

        let total = 0;

        // Recorre todos los perfumes que hay en el carrito
        carrito.forEach(producto => {
            const subtotal = producto.precio * producto.cantidad;
            total += subtotal;

            // Crea un pedacito de la lista para cada perfume
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';

            // Pone el nombre y cuántos llevas
            const nombreCantidad = document.createElement('div');
            nombreCantidad.textContent = `${producto.nombre} (x${producto.cantidad})`;

            // Pone el precio de lo que llevas de ese perfume
            const precioProducto = document.createElement('span');
            precioProducto.className = 'badge bg-primary rounded-pill';
            precioProducto.textContent = `$${subtotal.toLocaleString('es-CL')}`;

            li.appendChild(nombreCantidad);
            li.appendChild(precioProducto);

            // Añade el perfume a la lista del carrito en la página
            if (listaCarrito) {
                listaCarrito.appendChild(li);
            }
        });

        // Muestra el total de todos los perfumes en el carrito
        if (totalCarritoElemento) {
            totalCarritoElemento.textContent = `$${total.toLocaleString('es-CL')}`;
        }
    };

    // Esta función añade un perfume al carrito o le suma uno si ya lo tenías
    const agregarAlCarrito = (nombre, precio) => {
        // Busca si el perfume ya está en el carrito
        const productoExistente = carrito.find(producto => producto.nombre === nombre);

        if (productoExistente) {
            // Si ya lo tenías, le suma uno más
            productoExistente.cantidad++;
        } else {
            // Si es nuevo, lo agrega a la lista
            carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
        }
        guardarCarrito(); // Guarda el carrito para que no se borre
        mostrarCarrito(); // Vuelve a mostrar el carrito actualizado
    };

    // Esto hace que cuando hagas clic en un botón de "Añadir al carrito", funcione
    document.querySelectorAll('.boton-agregar-carrito').forEach(boton => {
        boton.addEventListener('click', (event) => {
            const card = event.target.closest('.card');
            const nombre = card.dataset.perfumeNombre;
            const precio = parseInt(card.dataset.perfumePrecio);
            
            // Llama a la función para que el perfume se agregue
            agregarAlCarrito(nombre, precio);
        });
    });

    // Esto hace que el carrito se muestre con lo que ya tenías guardado
    mostrarCarrito();
});