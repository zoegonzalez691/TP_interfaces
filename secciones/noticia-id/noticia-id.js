import { ComponenteBase } from '../componenteBase.js';

class ComponenteNoticia extends ComponenteBase { 
    //Si es una noticia destacada, muestro el dato.
    renderExtra() {
        let { esDestacada } = this._data;

        return esDestacada ? '<span class="badge">Destacada</span>' : '';
    }

}

customElements.define('noticia-detalle', ComponenteNoticia);

//Animacion de espera

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

//Obtener la noticia a renderizar por parametro.

let parametros = new URLSearchParams(location.search);
let id = parametros.get('id');

let contenedor = document.querySelector("#noticia-container");

function mostrarNoticia(noticia) {
    contenedor.innerHTML = "";

    let nueva = new ComponenteNoticia();

    nueva.setData(noticia);

    contenedor.appendChild(nueva);
}

async function obtenerNoticia() {

    try {
        mostrarLoader();

        const data = await fetch(`https://6a318e037bc5e1c61265ef95.mockapi.io/asociacionCivilSuenios/noticias/${id}`);
       
        if (!data.ok) {
            contenedor.innerHTML = `<p class="not-found">No se encontró la noticia</p>`;
            return;
        }

        let noticia = await data.json();
        mostrarNoticia(noticia);

    } catch (error) {
        console.error('Algo falló:', error);

    } finally {
        ocultarLoader();
    }
}


obtenerNoticia();