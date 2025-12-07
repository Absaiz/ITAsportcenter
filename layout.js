// layout.js - VERSIÓN ESTABLE + ANTI-CACHÉ

// 1. FORZAR LA CARGA DE ESTILOS (Anti-Caché)
// Usamos la fecha actual para que el navegador crea que es un archivo nuevo siempre.
const version = Date.now(); 
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = `style.css?v=${version}`; 
document.head.appendChild(link);

// 2. DEFINIR EL MENÚ (Actualizado con enlace a Reservas)
const menuHTML = `
        <a href="index.html" class="nav-logo">
            <img src="imagen/logo.jpg" alt="ITA Logo">
        </a>
        
        <div class="menu-icon" onclick="toggleMenu()">
            <span></span>
            <span></span>
            <span></span>
        </div>

        <div class="nav-links" id="navLinks">
            <a href="filosofia.html">Filosofía</a>
            <a href="reservas.html">Horarios</a> <a href="planes.html">Tarifas</a>
            <a href="contacto.html">Contacto</a>
            <a href="login.html" class="btn-login">ÁREA SOCIOS</a>
        </div>
    </nav>
`;

// 3. DEFINIR EL FOOTER (HTML)
const footerHTML = `
    <footer>
        <div class="container">
            <img src="imagen/logo.jpg" alt="ITA Small Logo" class="footer-logo">
            <p>© 2025 ITA Sport Center. Todos los derechos reservados.</p>
            <p style="margin-top:10px; font-size: 0.8rem; opacity: 0.6; letter-spacing: 2px;">IMAGINA • TRANSFORMA • ACTÚA</p>
        </div>
    </footer>
`;

// 4. EJECUTAR AL CARGAR LA PÁGINA
document.addEventListener("DOMContentLoaded", function() {
    
    // a) Limpieza de seguridad (Borrar menús viejos si los hubiera)
    const oldNav = document.querySelector('nav');
    if(oldNav) oldNav.remove();
    const oldFooter = document.querySelector('footer');
    if(oldFooter) oldFooter.remove();

    // b) Inyectar Menú y Footer (ESTO ES LO PRIORITARIO)
    document.body.insertAdjacentHTML('afterbegin', menuHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // c) Marcar enlace activo
    const currentPage = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // d) Cargar lógica de usuarios (Al final, para no bloquear)
    // Si falla, el menú ya está pintado, así que no pasa nada.
    import(`./auth.js?v=${version}`)
        .then(() => console.log("Sistema de usuarios activo"))
        .catch(err => console.log("Modo invitado (Auth no cargado)"));
});

// 5. FUNCIÓN GLOBAL PARA EL MÓVIL
window.toggleMenu = function() {
    var menu = document.getElementById("navLinks");
    if (menu) menu.classList.toggle("active");
}