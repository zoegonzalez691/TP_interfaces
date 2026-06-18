"use strict";

//Patron de mail (usuario@gmail.com)
const patronValidoMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//Patron telefeno (10 numeros en total)
const patronValidoTel = /^[0-9]{10}$/;

const formulario = document.querySelector(".formulario");

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


//Select motivo de consulta
let inputSelect = document.querySelector("#motivo");
let errorSelect = document.querySelector("#errorSelect");

//Input descripcion consulta
let inputConsulta = document.querySelector("#comentario");
let errorConsulta = document.querySelector("#errorConsulta");

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
    let motivoValido = inputSelect.value.trim() !== '';
    let consultaValida = inputConsulta.value.trim() !== '';

    if (nombreValido && correoValido && telefonoValido && motivoValido && consultaValida) {
        btnEnviar.disabled = false;

    } else {
        btnEnviar.disabled = true;
    }
}


[inputNombre, inputMail, inputTelefono, inputSelect, inputConsulta].forEach(input => {
    input.addEventListener('input', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

validarEntrada(inputNombre, errorNombre);
validarEntrada(inputMail, errorMail);
validarEntrada(inputTelefono, errorTelefono);
validarEntrada(inputSelect, errorSelect);
validarEntrada(inputConsulta, errorConsulta);


let respuestaForm = document.getElementById('respuestaForm');
let loading = document.getElementById('loading');
let mensajeEnviado = document.getElementById('mensajeEnviado');
let btnCerrar = document.getElementById('btnCerrar');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    respuestaForm.style.display = 'flex';
    loading.style.display = 'block';
    mensajeEnviado.style.display = 'none';

    setTimeout(() => {
        loading.style.display = 'none';
        mensajeEnviado.style.display = 'block';
    }, 2000);
});

btnCerrar.addEventListener('click', () => {
    respuestaForm.style.display = 'none';
});