// layout.js - VERSIÓN BLINDADA (Funciona siempre)

// 1. CARGAR ESTILOS
const version = Date.now(); 
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = `style.css?v=${version}`; 
document.head.appendChild(link);

// 2. EL MENÚ (Con la etiqueta <nav> bien puesta)
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

// 3. EL FOOTER
const footerHTML = `
    <footer>
        <div class="container">
            <img src="imagen/logo.png" alt="ITA Small Logo" class="footer-logo">
            <p>© 2025 ITA Sport Center. Todos los derechos reservados.</p>
            <p style="margin-top:10px; font-size: 0.8rem; opacity: 0.6; letter-spacing: 2px;">IMAGINA • TRANSFORMA • ACTÚA</p>
        </div>
    </footer>
`;

// --- FUNCIÓN QUE ARRANCA TODO ---
function iniciarLayout() {
    console.log("🚀 Pintando menú y footer..."); // Si ves esto en la consola, funciona

    // a) Limpieza para no duplicar
    const oldNav = document.querySelector('nav');
    if(oldNav) oldNav.remove();
    const oldFooter = document.querySelector('footer');
    if(oldFooter) oldFooter.remove();

    // b) Inyectar HTML (Lo importante)
    document.body.insertAdjacentHTML('afterbegin', menuHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // c) Marcar activo
    const currentPage = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if(link.getAttribute('href') === currentPage) link.classList.add('active');
    });

    // d) Cargar usuario
    import(`./auth.js?v=${version}`)
        .then(() => console.log("Usuario cargado"))
        .catch(() => console.log("Modo invitado"));
}

// 4. ¡AQUÍ ESTÁ LA MAGIA! (El detector de autobús)
// Si la página ya está lista ('interactive' o 'complete'), ejecutamos YA.
// Si no, esperamos al evento.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarLayout);
} else {
    iniciarLayout(); // ¡Ejecutar inmediatamente!
}

// 5. Función móvil
window.toggleMenu = function() {
    var menu = document.getElementById("navLinks");
    if (menu) menu.classList.toggle("active");
}