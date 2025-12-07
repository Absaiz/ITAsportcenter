// layout.js - VERSIÓN BLINDADA (Funciona aunque cargue tarde)

// 1. FORZAR LA CARGA DE ESTILOS (Anti-Caché)
const version = Date.now(); 
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = `style.css?v=${version}`; 
document.head.appendChild(link);

// 2. DEFINIR EL MENÚ
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

// 3. DEFINIR EL FOOTER
const footerHTML = `
    <footer>
        <div class="container">
            <img src="imagen/logo.png" alt="ITA Small Logo" class="footer-logo">
            <p>© 2025 ITA Sport Center. Todos los derechos reservados.</p>
            <p style="margin-top:10px; font-size: 0.8rem; opacity: 0.6; letter-spacing: 2px;">IMAGINA • TRANSFORMA • ACTÚA</p>
        </div>
    </footer>
`;

// --- FUNCIÓN PRINCIPAL DE INICIO ---
function iniciarLayout() {
    console.log("Iniciando Layout..."); // Chivato en consola

    // a) Limpieza de seguridad
    const oldNav = document.querySelector('nav');
    if(oldNav) oldNav.remove();
    const oldFooter = document.querySelector('footer');
    if(oldFooter) oldFooter.remove();

    // b) Inyectar Menú y Footer
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

    // d) Cargar lógica de usuarios
    import(`./auth.js?v=${version}`)
        .then(() => console.log("Sistema de usuarios activo"))
        .catch(err => console.log("Modo invitado (Auth no cargado)"));
}

// 4. DETECCIÓN INTELIGENTE DEL ESTADO DE CARGA
// Si la página ya cargó, ejecutamos directamente. Si no, esperamos.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarLayout);
} else {
    iniciarLayout(); // ¡Ejecutar ya!
}

// 5. FUNCIÓN GLOBAL PARA EL MÓVIL
window.toggleMenu = function() {
    var menu = document.getElementById("navLinks");
    if (menu) menu.classList.toggle("active");
}