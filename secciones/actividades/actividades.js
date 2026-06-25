let contenidoPrincipal = document.querySelector(".contenido");
let contenedor = document.getElementById("actividades");

let actividades = [];


async function cargarActividades() {
    try {

        mostrarLoader();

        let respuesta = await fetch(
            "https://6a318e037bc5e1c61265ef95.mockapi.io/asociacionCivilSuenios/actividades"
        );

        actividades = await respuesta.json();
        mostrarBotonAgregar();
        mostrarActividades();

    } catch (error) {
        console.log(error);
    }finally{
        ocultarLoader();
    }

}

function crearActividadCard(act) {
    let card = document.createElement("div");
    card.classList.add("card");

    let contenido = document.createElement("div");
    contenido.classList.add("card-content");

    contenido.innerHTML = `
        <div class="text_card">
            <h3>${act.titulo}</h3>
            <p>${act.breveDescripcion}</p>
            <a href="../actividadDetalle/actividad.html?id=${act.id}" class="ver-mas">
                Más Información →
            </a>
        </div>

        <div class="img_card">
            <img src="${act.img}" alt="${act.titulo}">
        </div>
    `;

    card.appendChild(contenido);

    if (localStorage.getItem("isLoggedIn")) {

        let btnContainer = document.createElement("div");
        btnContainer.classList.add("btn");

        let btnEdit = document.createElement("button");
        btnEdit.classList.add("btn_edit");
        btnEdit.dataset.id = act.id;
        btnEdit.innerHTML = `<img src="../../public/assets/iconos/editar.png">`;

        let btnElim = document.createElement("button");
        btnElim.classList.add("btn_elim");
        btnElim.dataset.id = act.id;
        btnElim.innerHTML = `<img src="../../public/assets/iconos/delete.png">`;



        btnContainer.appendChild(btnEdit);
        btnContainer.appendChild(btnElim);
        card.appendChild(btnContainer);



    }

    return card;
}

function mostrarBotonAgregar() {
    if (localStorage.getItem("isLoggedIn")) {
        let btnContainerAgregar = document.createElement("div");
        btnContainerAgregar.classList.add("botonAgregar");

        let btnAgregar = document.createElement("button");
        btnAgregar.setAttribute("data-tooltip", "Agregar actividad");
        btnAgregar.setAttribute("id", "btn_agregar");
        btnAgregar.innerHTML = `<img src="../../public/assets/iconos/agregar.png"alt="agregar"></img>`;

        btnContainerAgregar.appendChild(btnAgregar);

        contenidoPrincipal.prepend(btnContainerAgregar);
    }

}

function mostrarActividades() {
    contenedor.innerHTML = "";

    actividades.forEach(act => {
        let card = crearActividadCard(act);
        contenedor.appendChild(card);
    });
}


contenedor.addEventListener("click", (e) => {

    if (e.target.closest(".btn_edit")) {
        let id = e.target.closest(".btn_edit").dataset.id;
        location.href = `../formularios/administracion/adminAct.html?id=${id}`;

    }

    if (e.target.closest(".btn_elim")) {
        let id = e.target.closest(".btn_elim").dataset.id;
        let modalViejo = document.querySelector("modal-formulario");
        if (modalViejo) modalViejo.remove();

        let modal = new ModalFormulario();
        document.body.appendChild(modal);

        modal.renderConfirmacionEliminar(id, eliminarActividad);
    }
});

cargarActividades();

async function eliminarActividad(id) {
    try {
        let respuesta = await fetch(
            `https://6a318e037bc5e1c61265ef95.mockapi.io/asociacionCivilSuenios/actividades/${id}`,
            { method: "DELETE" }
        );

        if (respuesta.ok) {
            cargarActividades();
        } else {
            console.log("Error al eliminar");
        }

    } catch (error) {
        console.log(error);
    }
}

document.addEventListener("click", (e) => {
    if (e.target.closest("#btn_agregar")) {
        location.href = "../formularios/administracion/adminAct.html";
    }

});





