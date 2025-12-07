// --- CONTROL DE VERSIONES AUTOMÁTICO (ANTI-CACHÉ) ---
const webVersion = Date.now(); 

// 1. CARGAR EL CSS (style.css)
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = `style.css?v=${webVersion}`; 
document.head.appendChild(link);

// 2. EL MENÚ
const menuHTML = `
    <nav>
        <a href="index.html" class="nav-logo">
            <img src="imagen/logo.png" alt="ITA Logo">
        </a>
        <div class="menu-icon" onclick="toggleMenu()">
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

// 4. INYECTARLO TODO
document.addEventListener("DOMContentLoaded", function() {
    // Limpieza de seguridad: Si ya existen, los borramos antes de poner los nuevos
    const oldNav = document.querySelector('nav');
    if(oldNav) oldNav.remove();

    const oldFooter = document.querySelector('footer');
    if(oldFooter) oldFooter.remove();

    document.body.insertAdjacentHTML('afterbegin', menuHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    
    // Marcar enlace activo
    const currentPage = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

function toggleMenu() {
    var menu = document.getElementById("navLinks");
    menu.classList.toggle("active");
}