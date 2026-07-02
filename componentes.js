// COMPONENTES
class SiteHeader extends HTMLElement {
    connectedCallback() {
        let pagina = location.pathname.split('/').pop();
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';

        this.innerHTML =
            `<header class="header">
                    <div class="logoContenedor"> 
                        <div class="imgLogo">
                            <img src="/public/assets/iconos/logo.png" alt="Logo">
                        </div>

                        <div class="textoLogo">
                            <p class="asociacion">Asociación Civil</p>
                            <p class="nombre">Sueños</p>
                        </div>
                    </div>

                    <nav class="menu">
                        <ul class="no-desplegar" id="menu-container">
                            <li><a href="/index.html" class="${pagina === 'index.html' ? 'activo' : ''}">Inicio</a></li>
                            <li><a href="/secciones/quienesSomos/nosotros.html" class="${pagina === 'nosotros.html' ? 'activo' : ''}">¿Quienes Somos?</a></li>
                            <li><a href="/secciones/actividades/actividades.html" class="${pagina === 'actividades.html' ? 'activo' : ''}">Actividades</a></li>
                            <li><a href="/secciones/novedades/novedades.html" class="${pagina === 'novedades.html' ? 'activo' : ''}">Novedades</a></li>
                            <li><a href="/secciones/quieroAyudar/ayudar.html" class= "${pagina === 'ayudar.html' ? 'activo' : ''}" > Quiero Ayudar </a></li>
                            <li><a href="/secciones/formularios/contacto/formContacto.html" class="${pagina === 'formContacto.html' ? 'activo' : ''}">Contacto</a></li>
                        </ul>

                        <button class="iconos" id="menu">
                            <img src="/public/assets/iconos/menu-hamburguesa.png" alt="menu de hamburguesa" class="logo-hamburguesa">
                        </button>


                        ${loggedIn ? `
                            <div class="user-menu">
                            <img src="/public/assets/iconos/userWhite.png" alt="Usuario" class="user-icon" id="userIcon">
                            <div class="dropdown hidden" id="dropdown">
                                <button id="logout" class="btn-logout">Cerrar Sesión</button>
                            </div>
                            </div>` : ''}

                     </nav>
                </header>`;

        this.activarMenu();

        if (loggedIn) {
            const userIcon = this.querySelector('#userIcon');
            const dropdown = this.querySelector('#dropdown');
            userIcon.addEventListener('click', () => {
                dropdown.classList.toggle('hidden');
            });
            this.querySelector('#logout').addEventListener('click', () => {
                localStorage.removeItem('isLoggedIn');
                location.reload();
            });
        }
    }


    activarMenu() {
        const elementosMenu = this.querySelector("#menu-container");
        const boton = this.querySelector("#menu");

        let isDesplegado = false;

        boton.addEventListener("click", () => {
            if (!isDesplegado) {
                elementosMenu.classList.remove("no-desplegar");
                elementosMenu.classList.add("desplegar");

            } else {
                elementosMenu.classList.remove("desplegar");
                elementosMenu.classList.add("no-desplegar");
            }
            isDesplegado = !isDesplegado;
        });
    }

}


class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML =
            `<footer class="footer">
                    <div class="logoFooter"> 
                        <img src="/public/assets/iconos/logo.png" alt="logoFooter">
                    </div>

                    <p><a href="/secciones/formularios/contacto/formContacto.html">Necesito Ayuda</a></p>

                    <div class="iconos">
                        <img src="/public/assets/iconos/instagram.png" alt="icono instagram">
                        <img src="/public/assets/iconos/mail.png" alt="icono email">
                        <img src="/public/assets/iconos/facebook.png" alt="icono facebook">
                    </div>
                </footer>`
    }

}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
