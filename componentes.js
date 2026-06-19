// COMPONENTES
class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML =
                `<header class="header">
                    <div class="logoContenedor"> 
                        <div class="imgLogo">
                            <img src="/public/img/iconos/logo.png" alt="Logo">
                        </div>

                        <div class="textoLogo">
                            <p class="asociacion">Asociación Civil</p>
                            <p class="nombre">Sueños</p>
                        </div>
                    </div>

                    <nav class="menu">
                        <ul class="no-desplegar" id="menu-container">
                            <li>Inicio</li>
                            <li>¿Quienes Somos?</li>
                            <li>Actividades</li>
                            <li>Novedades</li>
                            <li>Quiero Ayudar</li>
                            <li>Contacto</li>
                        </ul>

                        <button class="iconos" id="menu">
                            <img src="/public/img/iconos/menu-hamburguesa.png" alt="menu de hamburguesa">
                        </button>
                     </nav>
                </header>`;
        
        this.activarMenu();
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


class SiteFooter extends HTMLElement{
    connectedCallback(){
        this.innerHTML = 
                `<footer class="footer">

                    <div class="logoFooter"> 
                        <img src="/public/img/iconos/logo.png" alt="logoFooter">
                    </div>

                    <p><a href="">Necesito Ayuda</a></p>

                    <div class="iconos">
                        <img src="/public/img/iconos/instagram.png" alt="icono instagram">
                        <img src="/public/img/iconos/mail.png" alt="icono email">
                        <img src="/public/img/iconos/facebook.png" alt="icono facebook">
                    </div>
                </footer>`
    }

}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
