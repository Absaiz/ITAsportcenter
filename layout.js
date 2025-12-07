// --- CONTROL DE VERSIONES ---
// Cambia este número cuando hagas modificaciones para limpiar la caché de todos los usuarios
const webVersion = "2.1"; 

// 1. CARGAR EL CSS AUTOMÁTICAMENTE (CON VERSIÓN)
// Así no tienes que poner <link> en cada HTML
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = `style.css?v=${webVersion}`; // Aquí ocurre la magia
document.head.appendChild(link);

// 2. CÓDIGO DEL MENÚ (NAVBAR)
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

// 3. CÓDIGO DEL FOOTER
const footerHTML = `
    <footer>
        <div class="container">
            <img src="imagen/logo.jpg" alt="ITA Small Logo" class="footer-logo">
            <p>© 2025 ITA Sport Center. Todos los derechos reservados.</p>
            <p style="margin-top:10px; font-size: 0.8rem; opacity: 0.6; letter-spacing: 2px;">IMAGINA • TRANSFORMA • ACTÚA</p>
        </div>
    </footer>
`;

// 4. INYECTAR TODO EN LA PÁGINA
document.addEventListener("DOMContentLoaded", function() {
    // Insertar menú arriba
    document.body.insertAdjacentHTML('afterbegin', menuHTML);
    
    // Insertar footer abajo
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    
    // Marcar enlace activo según la página
    const currentPage = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// 5. FUNCIÓN MENÚ MÓVIL
function toggleMenu() {
    var menu = document.getElementById("navLinks");
    menu.classList.toggle("active");
}