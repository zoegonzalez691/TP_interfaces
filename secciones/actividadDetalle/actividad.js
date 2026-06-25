import { ComponenteBase } from '../componenteBase.js';

class ComponenteActividad extends ComponenteBase {
    // Si requiere inscripción previa, muestro el botón.
    renderExtra() {
        let { requiereInscripcion, id } = this._data;

        return requiereInscripcion
            ? `<a class="inscribirme" href="../formularios/inscripcion/inscripcion.html?id=${id}">Inscribirme</a>`
            : '';
    }
}

customElements.define('actividad-detalle', ComponenteActividad);

// Animacion de espera

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

// Obtener la actividad a renderizar por parametro.

let parametros = new URLSearchParams(location.search);
let id = parametros.get('id');

let contenedor = document.querySelector("#actividad-container");

function mostrarActividad(actividad) {
    contenedor.innerHTML = "";

    let nueva = new ComponenteActividad();
    nueva.setData(actividad);
    contenedor.appendChild(nueva);
}

async function obtenerActividad() {
    try {
        mostrarLoader();

        const data = await fetch(`https://6a318e037bc5e1c61265ef95.mockapi.io/asociacionCivilSuenios/actividades/${id}`);

        if (!data.ok) {
            contenedor.innerHTML = `<p class="not-found">No se encontró la actividad</p>`;
            return;
        }

        let actividad = await data.json();
        mostrarActividad(actividad);

    } catch (error) {
        console.error('Algo falló:', error);

    } finally {
        ocultarLoader();
    }
}

obtenerActividad();