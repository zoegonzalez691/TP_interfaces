let noticias = [];

/**
 * Genero componentes para las noticias. Con cada noticia se genera una nueva instancia del objeto
 * que se va agregando al DOM del HTML.
 */
class NoticiaCard extends HTMLElement {
    setData(noticia) {
        this._data = noticia;
        this.render();
    }

    getData() {
        return this._data;
    }

    //Esta funcion como tal genera la estructura html con los datos correspondientes
    render() {
        if (!this._data) return;

        let { titulo, breveDescripcion, img, esDestacada, fecha, id } = this._data;
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';

        this.innerHTML = `
            <article class="noticia-card ${esDestacada ? 'destacada' : ''}">
                ${esDestacada ? '<span class="badge">Destacada</span>' : ''}
                <img src="${img}" alt="${titulo}">
                <div class="noticia-info">
                    <h3>${titulo}</h3>
                    <p>${breveDescripcion}</p>
                    <a class="ver-mas" href="../noticia-id/noticia-id.html?id=${id}">Ver más</a>
                </div>
            </article>

            ${loggedIn ? `
                    <div class="admin-controls">
                        <button class="btn-edicion" data-id="${id}">
                            <img src="../../public/assets/iconos/editar.png" alt="icono editar">
                        </button>
                        
                        <button class="btn-edicion" data-id="${id}">
                            <img src="../../public/assets/iconos/delete.png" alt="icono eliminar">
                        </button>
                    </div>
                    ` : ''
            }
        `;
    }
}

//Forma de relacionar el componente con el tag html correspondiente
customElements.define('noticia-card', NoticiaCard);


let contenedor = document.querySelector("#noticias-container");

/**
 * @param {*} noticias - lista de noticias recibida de la API
 * 
 * Recorro todas las noticias, genero una nueva card por cada una y la agrego al DOM dentro del contenedor
 * que le estableci
 */

function generarNoticias(noticias) {
    contenedor.innerHTML = "";

    if (noticias.length === 0) {
        contenedor.innerHTML = `<p class="not-found">No se encontraron resultados para su búsqueda</p>`;
        return;
    }

    noticias.forEach(noticia => {
        let nueva = new NoticiaCard;

        nueva.setData(noticia);

        contenedor.appendChild(nueva);
    });
}

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


//Establecer la conexion con la API
async function cargarNoticias() {
    try {
        mostrarLoader();

        const respuesta = await fetch('https://6a318e037bc5e1c61265ef95.mockapi.io/asociacionCivilSuenios/noticias');
        let noticiasActuales = await respuesta.json();

        noticiasActuales.sort((a, b) => b.fecha - a.fecha);
        noticias = noticiasActuales;

        generarNoticias(noticias);

    } catch (error) {
        console.error('Algo falló:', error);
    
    } finally {
        ocultarLoader(); 
    }
}

cargarNoticias();

//Filtrado de noticias

let busquedaNombre = document.querySelector("#busqueda");
let filtro = document.querySelector("#filtros");

/**
 * Evaluo que las noticias cumplan con los filtros establecidos antes de mostrarla
 */

function filtrarNoticias() {
    let textoBusqueda = busquedaNombre.value.trim().toLowerCase();
    let filtroSeleccionado = filtro.value;

    let coincidencias = noticias.filter((noticia) => {

        let coincideTitulo = noticia.titulo.toLowerCase().includes(textoBusqueda);
        let coincideRelevancia = filtroSeleccionado === 'Relevancia' ? noticia.esDestacada : true;

        return coincideTitulo && coincideRelevancia;
    });

    generarNoticias(coincidencias);
}

busquedaNombre.addEventListener('input', filtrarNoticias);
filtro.addEventListener('change', filtrarNoticias);