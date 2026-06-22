"use strict"

let contenedor = document.getElementById("actividades");

let actividades = [];

async function cargarActividades() {

    let respuesta = await fetch(
        "https://6a318e037bc5e1c61265ef95.mockapi.io/asociacionCivilSuenios/actividades"
    );

    actividades = await respuesta.json();

    mostrarActividades();
}

function mostrarActividades() {

    contenedor.innerHTML = "";

    actividades.forEach(act => {

        contenedor.innerHTML += `
            <div class="card">
                <div class="text_card"
                    <h3>${act.titulo}</h3>

                    <p>${act.breveDescripcion}</p>

                    <a href="actividad.html?id=${act.id}">Mas Informacion</a>
                </div>
                <div class="img_card">
                    <img src="${act.img}" alt="${act.titulo}">
                </div>
            </div>
        `;
    });
}

cargarActividades();
