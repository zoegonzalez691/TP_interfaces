"use strict";

import { ComponenteBase } from "../ComponenteBase.js";

customElements.define("noticia-detalle", ComponenteBase);

let params = new URLSearchParams(location.search);
let id = params.get("id");

async function cargarActividad() {

    if (!id) {
        document.querySelector(".actividadCompleta").innerHTML =
            "<p>ID no válido</p>";
        return;
    }

    try {
        let respuesta = await fetch(
            `https://6a318e037bc5e1c61265ef95.mockapi.io/asociacionCivilSuenios/actividades/${id}`
        );

        if (!respuesta.ok) {
            document.querySelector(".actividadCompleta").innerHTML =
                "<p>No se encontró la actividad</p>";
            return;
        }

        let actividad = await respuesta.json();

        let componente = document.querySelector("noticia-detalle");

        if (!componente) {
            console.log("No existe el componente en el HTML");
            return;
        }

        componente.setData(actividad);

    } catch (error) {
        console.log("Error cargando actividad:", error);

        document.querySelector(".actividadCompleta").innerHTML =
            "<p>Error cargando actividad</p>";
    }
}

cargarActividad();