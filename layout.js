// 1. CÓDIGO DEL MENÚ (BARRA DE NAVEGACIÓN)
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

// 2. CÓDIGO DEL FOOTER (PIE DE PÁGINA)
const footerHTML = `
    <footer>
        <div class="container">
            <img src="imagen/logo.png" alt="ITA Small Logo" class="footer-logo">
            <p>© 2025 ITA Sport Center. Todos los derechos reservados.</p>
            <p style="margin-top:10px; font-size: 0.8rem; opacity: 0.6; letter-spacing: 2px;">IMAGINA • TRANSFORMA • ACTÚA</p>
        </div>
    </footer>
`;

// 3. FUNCIÓN QUE INYECTA EL CÓDIGO EN LA PÁGINA
document.addEventListener("DOMContentLoaded", function() {
    // Insertar menú al principio del body
    document.body.insertAdjacentHTML('afterbegin', menuHTML);
    
    // Insertar footer al final del body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    
    // Resaltar el enlace de la página actual (Opcional)
    const currentPage = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// 4. LÓGICA DEL MENÚ MÓVIL
function toggleMenu() {
    var menu = document.getElementById("navLinks");
    menu.classList.toggle("active");
}