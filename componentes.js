
//Le muestro al navegador que es un elemento html para renderizar
class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML =
                `<header class="header">
                    <div class="logoContenedor"> 
                        <div class="imgLogo">
                            <img src="public/img/iconos/logo.png" alt="Logo">
                        </div>

                        <div class="textoLogo">
                            <p>Asociacion Civil <br>Sueños</p>
                        </div>
                    </div>

                    <nav class="menu">
                        <ul>
                            <li>Inicio</li>
                            <li>¿Quienes Somos?</li>
                            <li>Actividades</li>
                            <li>Novedades</li>
                            <li>Quiero Ayudar</li>
                            <li>Contacto</li>
                        </ul>
                     </nav>
                </header>`
    }

}


class SiteFooter extends HTMLElement{
    connectedCallback(){
        this.innerHTML = 
                `<footer class="footer">

                    <div class="logoFooter"> 
                        <img src="public/img/iconos/logo.png" alt="logoFooter">
                    </div>

                    <p><a href="">Necesito Ayuda</a></p>

                    <div class="iconos">
                        <img src="public/img/iconos/instagram.png" alt="icono instagram">
                        <img src="public/img/iconos/mail.png" alt="icono email">
                        <img src="public/img/iconos/facebook.png" alt="icono facebook">
                    </div>
                </footer>`
    }

}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);