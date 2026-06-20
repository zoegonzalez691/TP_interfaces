/**
 * Genero componentes para las noticias. Con cada noticia se genera una nueva instancia del objeto
 * que se va agregando al DOM del HTML.
 */
class NoticiaCard extends HTMLElement {
    setdata(noticia) {
        this._data = noticia;
        this.render();
    }

    getdata() {
        return this._data;
    }

    //Esta funcion como tal genera la estructura html con los datos correspondientes
    render() {
        if (!this._data) return;

        let { titulo, breveDescripcion, img, esDestacada, fecha, id } = this._data;

        this.innerHTML = `
            <article class="noticia-card ${esDestacada ? 'destacada' : ''}">
                ${esDestacada ? '<span class="badge">Destacada</span>' : ''}
                <img src="${img}" alt="${titulo}">
                <div class="noticia-info">
                    <h3>${titulo}</h3>
                    <p>${breveDescripcion}</p>
                    <button class="ver-mas" data-id="${id}">Ver más</button>
                </div>
            </article>
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
function generarNoticias(noticias){
    noticias.forEach(noticia => {
        let nueva = new NoticiaCard;

        nueva.setdata(noticia);

        contenedor.appendChild(nueva);
    });
}


//Establecer la conexion con la API
async function cargarNoticias() {
    try {
        const respuesta = await fetch('https://6a318e037bc5e1c61265ef95.mockapi.io/asociacionCivilSuenios/noticias');
        const noticias = await respuesta.json();

        generarNoticias(noticias);
        
    } catch (error) {
        console.error('Algo falló:', error);
    }
}

cargarNoticias();