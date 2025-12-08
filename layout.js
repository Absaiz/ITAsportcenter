// layout.js - VERSIÓN DEFINITIVA (PWA / MODO APP)

// 1. FORZAR LA CARGA DE ESTILOS (Anti-Caché)
const version = Date.now(); 
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = `style.css?v=${version}`; 
document.head.appendChild(link);

// 2. EL MENÚ
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

// --- FUNCIÓN PRINCIPAL ---
function iniciarLayout() {
    console.log("🚀 Iniciando Modo App...");

    // a) Limpieza
    const oldNav = document.querySelector('nav');
    if(oldNav) oldNav.remove();
    const oldFooter = document.querySelector('footer');
    if(oldFooter) oldFooter.remove();

    // b) Inyectar HTML
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

    // e) ACTIVAR MODO APP (Hack para iOS)
    activarModoApp();
}

// 4. EL DETECTOR DE CARGA
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarLayout);
} else {
    iniciarLayout();
}

// 5. FUNCIÓN MÓVIL
window.toggleMenu = function() {
    var menu = document.getElementById("navLinks");
    if (menu) menu.classList.toggle("active");
}

// 6. MODO APP IPHONE (PWA)
// Esto hace que los enlaces no te saquen de la pantalla completa
function activarModoApp() {
    
    // A) Inyectar etiquetas META para Apple (Para que se vea full screen)
    const metas = [
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
    ];

    metas.forEach(m => {
        if (!document.querySelector(`meta[name="${m.name}"]`)) {
            const meta = document.createElement('meta');
            meta.name = m.name;
            meta.content = m.content;
            document.head.appendChild(meta);
        }
    });

    // B) Hack de Navegación para iOS
    // Detectamos si es un clic en un enlace interno y forzamos la carga interna
    document.addEventListener('click', function(e) {
        // Buscamos si lo que se pulsó es un enlace (o algo dentro de un enlace)
        const anchor = e.target.closest('a');
        
        // Si es un enlace, es interno (mismo dominio) y no abre pestaña nueva...
        if (anchor && anchor.href && anchor.target !== '_blank' && anchor.hostname === window.location.hostname) {
            
            // PREVENIMOS EL COMPORTAMIENTO DE SAFARI
            e.preventDefault();
            
            // CAMBIAMOS LA PÁGINA "A MANO"
            window.location.href = anchor.href;
        }
    }, false);
}