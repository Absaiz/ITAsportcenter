// layout.js - VERSIÓN CORREGIDA (Menú + Footer + Anti-Caché)

// 1. CONTROL DE VERSIONES (Anti-Caché)
const version = Date.now(); 

// 2. CARGAR EL CSS FORZANDO LA VERSIÓN
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = `style.css?v=${version}`; 
document.head.appendChild(link);

// 3. DEFINIR EL MENÚ (Con la etiqueta <nav> que faltaba)
const menuHTML = `
    <nav>
        <a href="index.html" class="nav-logo">
            <img src="imagen/logo.png" alt="ITA Logo">
        </a>
        
        <div class="menu-icon" onclick="window.toggleMenu()">
            <span></span>
            <span></span>
            <span></span>
        </div>

        <div class="nav-links" id="navLinks">
            <a href="filosofia.html">Filosofía</a>
            <a href="reservas.html">Horarios</a>
            <a href="planes.html">Tarifas</a>
            <a href="contacto.html">Contacto</a>
            <a href="login.html" class="btn-login">ÁREA SOCIOS</a>
        </div>
    </nav>
`;

// 4. DEFINIR EL FOOTER
const footerHTML = `
    <footer>
        <div class="container">
            <img src="imagen/logo.png" alt="ITA Small Logo" class="footer-logo">
            <p>© 2025 ITA Sport Center. Todos los derechos reservados.</p>
            <p style="margin-top:10px; font-size: 0.8rem; opacity: 0.6; letter-spacing: 2px;">IMAGINA • TRANSFORMA • ACTÚA</p>
        </div>
    </footer>
`;

// 5. INYECTAR TODO AL CARGAR LA PÁGINA
document.addEventListener("DOMContentLoaded", function() {
    
    // a) Limpieza de seguridad (Borrar si ya existían para no duplicar)
    const oldNav = document.querySelector('nav');
    if(oldNav) oldNav.remove();
    const oldFooter = document.querySelector('footer');
    if(oldFooter) oldFooter.remove();

    // b) Inyectar Menú (Arriba) y Footer (Abajo)
    document.body.insertAdjacentHTML('afterbegin', menuHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // c) Marcar pestaña activa (Negrita en el menú)
    const currentPage = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // d) Cargar lógica de usuarios
    import(`./auth.js?v=${version}`)
        .then(() => console.log("Sistema de usuarios activo"))
        .catch(err => console.log("Modo invitado"));
});

// 6. FUNCIÓN GLOBAL PARA EL MÓVIL
window.toggleMenu = function() {
    var menu = document.getElementById("navLinks");
    if (menu) menu.classList.toggle("active");
}