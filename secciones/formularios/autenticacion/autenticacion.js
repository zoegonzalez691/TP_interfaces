const user = {
    email: "asociacionsuenios@gmail.com",
    password: "admin"
}

/**
 * Ventana Modal para mostrar resultado del inicio de sesion
 */

class ModalLogin extends HTMLElement {
    connectedCallback() {
        // Render inicial vacío
        this.innerHTML = '';
    }

    renderPositivo() {
        this.innerHTML = `
        <div class="modal-container">
            <div class="modal">
            <h2>¡Bienvenido!</h2>
            <button id="btnCerrar">Cerrar</button>
            </div>
        </div>
        `;
        this.querySelector('#btnCerrar').addEventListener('click', () => this.remove());
    }

    renderInputNegativo(dato) {
        this.innerHTML = `
        <div class="modal-container">
            <div class="modal">
            <h2>${dato} incorrecto</h2>
            <p>Intente nuevamente</p>
            <button id="btnCerrar">Cerrar</button>
            </div>
        </div>
        `;
        this.querySelector('#btnCerrar').addEventListener('click', () => this.remove());
    }

    renderNegativo() {
        this.innerHTML = `
        <div class="modal-container">
            <div class="modal">
            <h2>Email y contraseña incorrectas</h2>
            <p>Intente nuevamente</p>
            <button id="btnCerrar">Cerrar</button>
            </div>
        </div>
        `;
        this.querySelector('#btnCerrar').addEventListener('click', () => this.remove());
    }
}

customElements.define('modal-login', ModalLogin);

// VALIDACION DEL FORMULARIO

const patronValidoMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let formulario = document.querySelector("#login");

let inputMail = document.querySelector("#email");
let inputPassword = document.querySelector("#password");
let btnEnviar = document.querySelector(".btnEnviar");

let errorMail = document.querySelector("#errorMail");
let errorPass = document.querySelector("#errorPass");

inputMail.addEventListener('input', () => {
    let valor = inputMail.value.trim();

    if (!patronValidoMail.test(valor)) {
        errorMail.textContent = 'Ingrese un formato válido (ej: usuario@dominio.com)';
        errorMail.classList.add('activo');
    } else {
        errorMail.textContent = '';
        errorMail.classList.remove('activo');
    }
});

function validarEntrada(divInput, divError) {
    divInput.addEventListener('blur', () => {
        if (divInput.value.trim() === '') {
            divError.textContent = 'Este campo es obligatorio';
            divError.classList.add('activo');
        } else {
            divError.textContent = '';
            divError.classList.remove('activo');
        }
    });
}

function validarFormulario() {
    let correoValido = patronValidoMail.test(inputMail.value.trim());
    let passwordValida = inputPassword.value.trim() !== "";

    if (correoValido && passwordValida) {
        btnEnviar.disabled = false;
    } else {
        btnEnviar.disabled = true;
    }
}

[inputPassword, inputMail].forEach(input => {
    input.addEventListener('input', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

validarEntrada(inputMail, errorMail);
validarEntrada(inputPassword, errorPass);

let loaderContainer = document.getElementById('animacion-carga');

let animation = lottie.loadAnimation({
    container: loaderContainer,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/public/assets/animacion/loading.json'
});

function mostrarLoader() {
    loaderContainer.style.display = 'block';
}

function ocultarLoader() {
    loaderContainer.style.display = 'none';
}

function mostrarResultado() {
    mostrarLoader();

    let modal = new ModalLogin();
    document.body.appendChild(modal);
    
    if (inputMail.value.trim() === user.email && inputPassword.value.trim() === user.password) {
        modal.renderPositivo();

    } else if (inputMail.value.trim() !== user.email && inputPassword.value.trim() === user.password) {
        modal.renderInputNegativo("E-mail");

    } else if (inputMail.value.trim() === user.email && inputPassword.value.trim() !== user.password) {
        modal.renderInputNegativo("Contraseña");

    } else {
        modal.renderNegativo();
    }

    ocultarLoader();
}


formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    mostrarResultado();
});

