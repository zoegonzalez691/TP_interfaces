let params = new URLSearchParams(location.search);

let idActividad = params.get("id");
console.log(idActividad);

let actividad = null;

async function cargarActividad() {

   
    let respuesta = await fetch(
        `https://6a318e037bc5e1c61265ef95.mockapi.io/asociacionCivilSuenios/actividades/${idActividad}`
    );

    actividad = await respuesta.json();

    console.log(actividad);
     document.querySelector("#tituloActividad").textContent =
    actividad.titulo;
}

cargarActividad();

class ModalInscripto extends HTMLElement {
    connectedCallback() {
        // Render inicial vacío
        this.innerHTML = '';
    }

    render() {
        this.innerHTML = `
        <div class="modal-container">
            <div class="modal">
            <h2>¡Formulario enviado correctamente!</h2>
            <button class="btnModal" id="btnCerrar">Cerrar</button>
            </div>
        </div>
        `;

        this.querySelector('#btnCerrar').addEventListener('click', () => {
            this.remove();
            window.location.href = "../../../index.html"; // redirige al index
        });
    }

}

customElements.define('modal-inscripto', ModalInscripto);

//Patron de mail (usuario@gmail.com)
const patronValidoMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//Patron telefeno (10 numeros en total)
const patronValidoTel = /^[0-9]{10}$/;

//Patron de DNI
const patronValidoDNI = /^[0-9]{7,8}$/;

const formulario = document.querySelector("#inscripcionForm");

//Input nombre
let inputNombre = document.querySelector("#nombre");
let errorNombre = document.querySelector("#errorNombre");

//Input mail
let inputMail = document.querySelector("#correo");
let errorMail = document.querySelector("#errorMail");

inputMail.addEventListener('input', (e) => {
    let valor = inputMail.value.trim();

    //Valida el valor ingresado con el patron establecido
    if (!patronValidoMail.test(valor)) {
        errorMail.textContent = 'Ingrese un formato valido (ej: usuario@dominio.com)';
        errorMail.classList.add('activo');


    } else {
        errorMail.textContent = '';
        errorMail.classList.remove('activo');
    }
});

//Input de telefono
let inputTelefono = document.querySelector("#telefono");
let errorTelefono = document.querySelector("#errorTel");

inputTelefono.addEventListener('input', (e) => {
    let valor = inputTelefono.value.trim();

    if (!patronValidoTel.test(valor)) {
        errorTelefono.textContent = 'Solo se permiten números de 10 digitos';
        errorTelefono.classList.add('activo');

    } else {
        errorTelefono.textContent = '';
        errorTelefono.classList.remove('activo');
    }

});

//Input DNI
let inputDNI = document.querySelector("#dni");
let errorDNI = document.querySelector("#errorDNI");

inputDNI.addEventListener('input', (e) => {
    let valor = inputDNI.value.trim();

    if (!patronValidoDNI.test(valor)) {
        errorDNI.textContent = 'Solo se permiten números DNI';
        errorDNI.classList.add('activo');

    } else {
        errorDNI.textContent = '';
        errorDNI.classList.remove('activo');
    }

});
//Input fecha
let inputFecha = document.querySelector("#fechaNacimiento");
let errrorFecha = document.querySelector("#fecha");

//Boton enviar
let btnEnviar = document.querySelector("#btnEnviar");

/**
 * 
 * @param {*} divInput - input a verificar
 * @param {*} divError - contenedor del mensaje
 * 
 * Verifica que si hicieron click sobre el input, no lo dejen vacio. 
 * En caso de que quede vacio, maneja un mensaje de error.
 */

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

/**
 * Validacion del formulario completo. Si algun campo del formulario
 * no es correcto, no permite que se active el boton para enviar el formulario
 */

function validarFormulario() {
    let nombreValido = inputNombre.value.trim() !== '';
    let correoValido = patronValidoMail.test(inputMail.value.trim());
    let telefonoValido = patronValidoTel.test(inputTelefono.value.trim());
    let dniValido = patronValidoDNI.test(inputDNI.value.trim());
    let fechaValida = inputFecha.value.trim() !== '';

    if (nombreValido && correoValido && telefonoValido && dniValido && fechaValida) {
        btnEnviar.disabled = false;

    } else {
        btnEnviar.disabled = true;
    }
}


[inputNombre, inputMail, inputTelefono, inputDNI, inputFecha].forEach(input => {
    input.addEventListener('input', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

validarEntrada(inputNombre, errorNombre);
validarEntrada(inputMail, errorMail);
validarEntrada(inputTelefono, errorTelefono);
validarEntrada(inputDNI, errorDNI);
validarEntrada(inputFecha, errrorFecha);

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

let contendor = document.querySelector(".contenido");

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    mostrarLoader();

    setTimeout((e) => {
        let modal = new ModalInscripto();
        contendor.appendChild(modal);
        modal.render();

        ocultarLoader();
    }, 1000);

});

