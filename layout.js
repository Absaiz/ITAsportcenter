// layout.js - VERSIÓN ROBUSTA (A PRUEBA DE FALLOS)

// 1. EL MENÚ (HTML)
const menuHTML = `
    <nav>
        <a href="index.html" class="nav-logo">
            <img src="imagen/logo.jpg" alt="ITA Logo">
        </a>
        <div class="menu-icon" onclick="window.toggleMenu()">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="nav-links" id="navLinks">
            <a href="filosofia.html">Filosofía</a>
            <a href="instalaciones.html">Instalaciones</a>
            <a href="planes.html">Servicios y Tarifas</a>
            <a href="contacto.html">Contacto</a>
            <a href="#" class="btn-login">ÁREA SOCIOS</a>
        </div>
    </nav>
`;

// 2. EL FOOTER (HTML)
const footerHTML = `
    <footer>
        <div class="container">
            <img src="imagen/logo.jpg" alt="ITA Small Logo" class="footer-logo">
            <p>© 2025 ITA Sport Center. Todos los derechos reservados.</p>
            <p style="margin-top:10px; font-size: 0.8rem; opacity: 0.6; letter-spacing: 2px;">IMAGINA • TRANSFORMA • ACTÚA</p>
        </div>
    </footer>
`;

// 3. INYECTARLO TODO (INMEDIATAMENTE)
document.addEventListener("DOMContentLoaded", function() {
    // Limpieza de seguridad
    const oldNav = document.querySelector('nav');
    if(oldNav) oldNav.remove();
    const oldFooter = document.querySelector('footer');
    if(oldFooter) oldFooter.remove();

    // Insertar menú y footer
    document.body.insertAdjacentHTML('afterbegin', menuHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    
    // Marcar pestaña activa
    const currentPage = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // 4. CARGAR LA LÓGICA DE USUARIOS (DINÁMICAMENTE)
    // Usamos import() dinámico. Si falla auth.js, el menú YA estará visible, solo daremos un aviso en consola.
    import("./auth.js")
        .then(() => console.log("Sistema de usuarios cargado correctamente"))
        .catch(err => console.error("Error cargando usuarios (pero el menú sigue vivo):", err));
});

// Función global para el menú móvil
window.toggleMenu = function() {
    var menu = document.getElementById("navLinks");
    menu.classList.toggle("active");
}