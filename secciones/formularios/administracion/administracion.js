//Animacion de carga
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

/**
 * Modal para pedir confirmaciones y mostrar el mensaje correspondiente
 */

class ModalFormulario extends HTMLElement {

    renderConfirmacionDelete() {
        this.innerHTML = `
            <div class="modal-container">
                <div class="modal">
                <p>¿Desea descartar los cambios?</p>

                <button class="btnModal" id="aceptar">Descartar</button>
                <button class="btnModal" id="cancelar">Cancelar</button>
                
                </div>
            </div>
        `;

        this.querySelector("#cancelar").addEventListener('click', (e) => {
            this.remove();
        });

        this.querySelector("#aceptar").addEventListener('click', (e) => {
            let form = this.querySelector("#administracion");
            //salgo de edicion y vuelvo a la seccion de novedades
        });

    }

    renderConfirmacionSave(form) {
        this.innerHTML = `
        <div class="modal-container">
            <div class="modal">
            <p>¿Desea confirmar los cambios?</p>

            <button class="btnModal" id="aceptar">Confirmar</button>
            <button class="btnModal" id="cancelar">Cancelar</button>
            
            </div>
        </div>
    `;

        this.querySelector("#cancelar").addEventListener('click', (e) => {
            this.innerHTML = '';  
        });

        this.querySelector("#aceptar").addEventListener('click', (e) => {
            this.innerHTML = '';   
            form.procesarFormulario();
        });
    }

    renderOperacionExitosa(operacion, form) {
        this.innerHTML = `
            <div class="modal-container">
                <div class="modal">
                <h2>¡Se ha ${operacion} correctamente!</h2>

                <button class="btnModal" id="cerrar">Cerrar</button>
                </div>
            </div>
        `;

        this.querySelector("#cerrar").addEventListener('click', (e) => {
            location.href = form.salida;
        });
    }

    renderError(operacion) {
        this.innerHTML = `
            <div class="modal-container">
                <div class="modal">
                <h2>No se ha podido ${operacion}</h2>

                <button class="btnModal" id="cerrar">Cerrar</button>
                </div>
            </div>
        `;

        this.querySelector("#cerrar").addEventListener('click', () => {
            this.remove();
        });

    }
}

customElements.define("modal-formulario", ModalFormulario);

/**
 * Componente de formulario base. Recibe el tipo que tiene que mostrar, y segun corresponda
 * realiza lo necesario.
 */

class FormularioBase extends HTMLElement {
    connectedCallback() {
        this.tipo = this.getAttribute("tipo");
        this.salida = this.getAttribute("rutaSalida");
        this.idEdicion = new URLSearchParams(location.search).get('id');
        this.URL_API = `https://6a318e037bc5e1c61265ef95.mockapi.io/asociacionCivilSuenios/${this.tipo}`;

        if (this.idEdicion) {
            this.renderizarEdicion();
        } else {
            this.render();
        }
    }

    async renderizarEdicion() {
        try {
            mostrarLoader();

            let modal = new ModalFormulario();
            let contenedor = document.querySelector(".contenido");
            contenedor.appendChild(modal);

            const response = await fetch(`${this.URL_API}/${this.idEdicion}`);

            this._data = await response.json();

            this.render();

        } catch (e) {
            console.log("Error " + e);


        } finally {
            ocultarLoader();
        }

    }

    //Componente del formulario de edicion/creacion
    render() {
        this.innerHTML = `
            <form class="form-base" id="administracion">
                <h2 class="form-titulo">${this._data ? 'Editando' : 'Nueva'} ${this.tipo}</h2>
                
                <div class="seccion-input">
                    <label for="titulo">Título</label>
                    <input type="text" id="titulo" placeholder="Ingrese título" value="${this._data ? this._data.titulo : ''}" required>

                    <small class="error" id="errorTitulo"></small>
                </div>

                <div class="seccion-input">
                    <label for="breveD">Breve descripción</label>
                    <input type="text" id="breveD" placeholder="Ingrese breve descripción" value="${this._data ? this._data.breveDescripcion : ''}" required>

                    <small class="error" id="errorBreveD"></small>
                </div>

                <div class="seccion-input">
                    <label for="imagen">Imagen</label>
                    <input type="file" id="imagen" accept="image/*" ${this._data && this._data.img ? "" : "required"}>
                    <img id="preview" alt="Vista previa" class="preview-img" src="${this._data ? this._data.img : ''}">

                    <small class="error" id="errorImg"></small>
                </div>

                <div class="seccion-input">
                    <label for="descripcion">Descripción</label>
                    <textarea id="descripcion" placeholder="Ingrese descripción" required>${this._data ? this._data.descripcion : ''}</textarea>

                    <small class="error" id="errorD"></small>
                </div>

                <div class="seccion-checkbox">
                ${this.tipo === "noticias" ? `
                    <label><input type="checkbox" id="destacada" name="destacada" ${this._data && this._data.esDestacada ? 'checked' : ''}> Destacada</label>
                ` : ""}
                ${this.tipo === "actividades" ? `
                    <label><input type="checkbox" id="inscripcion" name="inscripcion" ${this._data && this._data.requiereInscripcion ? 'checked' : ''}> Requiere inscripción</label>
                ` : ""}
                </div>

                <div class="seccion-botones">
                <button type="submit" class="btn-edicion guardar" disabled>
                    <img src="../../../public/assets/iconos/save.png" alt="icono de guardar">
                </button>
                <button type="reset" class="btn-edicion eliminar">
                    <img src="../../../public/assets/iconos/delete.png" alt="icono de eliminar">
                </button>
                </div>
            </form>
        `;

        //Logica de preview de imagen
        let fileInput = this.querySelector("#imagen");
        let preview = this.querySelector("#preview");

        fileInput.addEventListener("change", () => {
            const file = fileInput.files[0];

            if (file) {
                preview.src = URL.createObjectURL(file);
            }
        });

        this.controlarInputs();
        this.confirmarFormulario();
    }

    //Manejo de restricciones
    controlarInputs() {
        //Titulo
        let inputTitulo = this.querySelector("#titulo");
        let errorTirulo = this.querySelector("#errorTitulo");
        this.validarEntrada(inputTitulo, errorTirulo);

        //Breve descripcion
        let inputBreveD = this.querySelector("#breveD");
        let errorBreveD = this.querySelector("#errorBreveD");
        this.validarEntrada(inputBreveD, errorBreveD);

        //Imagen
        let inputImg = this.querySelector("#imagen");
        let errorImg = this.querySelector("#errorImg");
        this.validarEntrada(inputImg, errorImg);

        //Descripcion
        let inputDesc = this.querySelector("#descripcion");
        let errorDesc = this.querySelector("#errorD");
        this.validarEntrada(inputDesc, errorDesc);

        [inputTitulo, inputBreveD, inputImg, inputDesc].forEach(input => {
            input.addEventListener('input', () => {
                this.validarFormulario()
            });

            input.addEventListener('blur', () => {
                this.validarFormulario()
            });
        });
    }

    validarEntrada(divInput, divError) {
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

    validarFormulario() {
        let titulo = this.querySelector("#titulo").value.trim() !== "";
        let breveD = this.querySelector("#breveD").value.trim() !== "";
        let descripcion = this.querySelector("#descripcion").value.trim() !== "";
        let imagen = (this._data && this._data.img) || this.querySelector("#imagen").files.length > 0;

        let btnGuardar = this.querySelector(".btn-edicion.guardar");

        if (titulo && breveD && descripcion && imagen) {
            btnGuardar.disabled = false;

        } else {
            btnGuardar.disabled = true;
        }
    }

    confirmarFormulario() {
        let form = this.querySelector("#administracion");

        let contenedor = document.querySelector(".contenido");
        let modal = new ModalFormulario();
        contenedor.appendChild(modal);

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            modal.renderConfirmacionSave(this);
        });
    }

    async procesarFormulario() {
        try {

            mostrarLoader();

            let contenedor = document.querySelector(".contenido");
            let modal = new ModalFormulario();

            contenedor.appendChild(modal);

            let fileInput = this.querySelector("#imagen");
            let hayImagenNueva = fileInput.files.length > 0;

            let urlImagen;

            if (hayImagenNueva) {
                // Subo la imagen nueva a Cloudinary y espero el link
                let formData = new FormData();
                formData.append('file', fileInput.files[0]);
                formData.append('upload_preset', 'asociacionsuenios');

                let respuestaCloudinary = await fetch('https://api.cloudinary.com/v1_1/dqdttvfjx/image/upload', {
                    method: 'POST',
                    body: formData
                });

                let datosCloudinary = await respuestaCloudinary.json();
                urlImagen = datosCloudinary.secure_url;

            } else {
                urlImagen = this._data.img;
            }

            let datosFormulario = {
                titulo: this.querySelector("#titulo").value.trim(),
                breveDescripcion: this.querySelector("#breveD").value.trim(),
                descripcion: this.querySelector("#descripcion").value.trim(),
                img: urlImagen,
                fecha: new Date().toISOString(),
                ...(this.tipo === "noticias"
                    ? { esDestacada: this.querySelector("#destacada").checked }
                    : { requiereInscripcion: this.querySelector("#inscripcion").checked }
                )
            };

            if (this._data) {
                let modificado = await this.updateForm(datosFormulario);

                if (modificado) {
                    modal.renderOperacionExitosa("modifico", this);

                } else {
                    modal.renderError("modificar", this);
                }

            } else {
                let agregado = await this.agregarForm(datosFormulario);

                if (agregado) {
                    modal.renderOperacionExitosa("agrego", this);

                } else {
                    modal.renderError("agregar", this);
                }
            }

        } catch (error) {
            console.log("Error " + error);

        } finally {
            ocultarLoader();
        }
    }

    async updateForm(datosFormulario) {
        try {
            const response = await fetch(`${this.URL_API}/${this.idEdicion}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosFormulario)
            });

            if (response.ok) {
                return true;

            } else {
                return false;
            }

        } catch (error) {
            return false;
        }
    }

    async agregarForm(datosFormulario) {
        try {
            const response = await fetch(`${this.URL_API}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosFormulario)
            });

            if (response.ok) {
                return true;

            } else {
                return false;
            }

        } catch (error) {
            return false;
        }
    }
}

customElements.define("formulario-base", FormularioBase);
