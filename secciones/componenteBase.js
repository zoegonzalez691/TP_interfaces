
/**
 * Componente base de noticia/actividad (muestra el detalle segun el id). Noticia y actividad lo heredan y modifican agregando
 * conexiones a la API correspondiente.
 */

export class ComponenteBase extends HTMLElement {

    setData(data) {
        this._data = data;

        this.render();
    }

    getData() {
        return this._data;
    }

    render() {
        if (!this._data) return;

        let { titulo, breveDescripcion, descripcion, img, fecha, id } = this._data;

        this.innerHTML = `
            <article class="detalle-card">
                <h1>${titulo}</h1>
                <p class="subtitulo">${breveDescripcion}</p>
                <img src="${img}" alt="imagen de ${titulo}" class="detalle-img">
                <p class="descripcion">${descripcion}</p>
                ${this.renderExtra()}
            </article>
        `;
    }

    renderExtra() {
        return '';
    }

}