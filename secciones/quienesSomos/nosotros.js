
/**
 * Anima la aparición de las líneas divisorias (.divisor) cuando entran en pantalla.
 * Usa IntersectionObserver para detectar cuándo cada línea se vuelve visible,
 * le agrega la clase "visible" (que dispara la transición de opacidad en el CSS),
 * y deja de observarla para que no se repita la animación al volver a scrollear.
 */

let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.divisor').forEach((linea) => {
    observer.observe(linea);
});