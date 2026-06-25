let contenedor = document.getElementById("carruselNoticias");

let noticias = [];
let indiceActual = 0;

async function cargarNoticias() {

    let respuesta = await fetch(
        "https://6a318e037bc5e1c61265ef95.mockapi.io/asociacionCivilSuenios/noticias"
    );

    noticias = (await respuesta.json()).filter(
        noticia => noticia.esDestacada
    );

    mostrarNoticia();
}

function mostrarNoticia() {

    if (noticias.length === 0) {
        contenedor.innerHTML = "<p>No hay noticias</p>";
        return;
    }

    let noticia = noticias[indiceActual];

    contenedor.innerHTML = `
        <article class="noticia-card">
            <img src="${noticia.img}" alt="${noticia.titulo}">
            <h3>${noticia.titulo}</h3>
            <p>${noticia.breveDescripcion}</p>
            <a href="./secciones/noticia-id/noticia-id.html?id=${noticia.id}">
                Ver noticia
            </a>
        </article>
    `;
}

document
    .getElementById("siguiente")
    .addEventListener("click", () => {

        indiceActual++;

        if (indiceActual >= noticias.length) {
            indiceActual = 0;
        }

        mostrarNoticia();
    });

document
    .getElementById("anterior")
    .addEventListener("click", () => {

        indiceActual--;

        if (indiceActual < 0) {
            indiceActual = noticias.length - 1;
        }

        mostrarNoticia();
    });

cargarNoticias();