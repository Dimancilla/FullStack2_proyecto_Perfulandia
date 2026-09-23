
document.addEventListener('DOMContentLoaded', () => {

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const guardarCarrito = () => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    };

    const mostrarCarrito = () => {
        const listaCarrito = document.getElementById('lista-carrito');
        const totalCarritoElemento = document.getElementById('total-carrito');

        if (listaCarrito) {
            listaCarrito.innerHTML = '';
        }

        let total = 0;

        carrito.forEach(producto => {
            const subtotal = producto.precio * producto.cantidad;
            total += subtotal;

            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';

            const nombreCantidad = document.createElement('div');
            nombreCantidad.textContent = `${producto.nombre} (x${producto.cantidad})`;

            const precioProducto = document.createElement('span');
            precioProducto.className = 'badge bg-primary rounded-pill';
            precioProducto.textContent = `$${subtotal.toLocaleString('es-CL')}`;

            li.appendChild(nombreCantidad);
            li.appendChild(precioProducto);

            if (listaCarrito) {
                listaCarrito.appendChild(li);
            }
        });

        if (totalCarritoElemento) {
            totalCarritoElemento.textContent = `$${total.toLocaleString('es-CL')}`;
        }
    };

    const agregarAlCarrito = (nombre, precio) => {
        const productoExistente = carrito.find(producto => producto.nombre === nombre);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
        }
        guardarCarrito(); 
        mostrarCarrito(); 
    };

    document.querySelectorAll('.boton-agregar-carrito').forEach(boton => {
        boton.addEventListener('click', (event) => {
            const card = event.target.closest('.card');
            const nombre = card.dataset.perfumeNombre;
            const precio = parseInt(card.dataset.perfumePrecio);
            
            agregarAlCarrito(nombre, precio);
        });
    });

    mostrarCarrito();


    const formContacto = document.getElementById('form-contacto');

    if (formContacto) {
        const mostrarError = (inputElement, mensaje) => {
            inputElement.classList.add('is-invalid');
            inputElement.classList.remove('is-valid');
            
            let feedback = inputElement.nextElementSibling;
            if (!feedback || !feedback.classList.contains('invalid-feedback')) {
                feedback = document.createElement('div');
                feedback.className = 'invalid-feedback';
                inputElement.parentNode.appendChild(feedback);
            }
            feedback.textContent = mensaje;
        };

        const mostrarExito = (inputElement) => {
            inputElement.classList.remove('is-invalid');
            inputElement.classList.add('is-valid');
        };

        formContacto.addEventListener('submit', (event) => {
            event.preventDefault(); 

            const nombre = document.getElementById('nombre-input');
            const email = document.getElementById('email-input');
            const telefono = document.getElementById('telefono-input');
            const mensaje = document.getElementById('mensaje-input');

            let esValido = true;

            if (nombre.value.trim().length < 3) {
                mostrarError(nombre, 'Por favor, ingresa tu nombre completo (mínimo 3 caracteres).');
                esValido = false;
            } else {
                mostrarExito(nombre);
            }

            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email.value.trim())) {
                mostrarError(email, 'Por favor, ingresa un correo electrónico válido (ejemplo@dominio.com).');
                esValido = false;
            } else {
                mostrarExito(email);
            }

            if (telefono.value.trim() !== '' && telefono.value.trim().length < 8) {
                mostrarError(telefono, 'El número de teléfono debe tener al menos 8 dígitos.');
                esValido = false;
            } else if (telefono.value.trim() !== '') {
                mostrarExito(telefono);
            }

            if (mensaje.value.trim().length < 10) {
                mostrarError(mensaje, 'El mensaje debe contener al menos 10 caracteres explicativos.');
                esValido = false;
            } else {
                mostrarExito(mensaje);
            }

            if (esValido) {
                alert('¡Gracias por contactarnos! Tu mensaje ha sido enviado correctamente.');
                formContacto.reset();
                [nombre, email, telefono, mensaje].forEach(input => input.classList.remove('is-valid'));
            }
        });
    }
});