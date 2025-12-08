// layout.js - VERSIÓN BLINDADA (Funciona siempre, llegue tarde o pronto)

// 1. FORZAR LA CARGA DE ESTILOS
const version = Date.now(); 
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = `style.css?v=${version}`; 
document.head.appendChild(link);

// 2. EL MENÚ (Correcto)
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

// 3. EL FOOTER (Correcto)
const footerHTML = `
    <footer>
        <div class="container">
            <img src="imagen/logo.png" alt="ITA Small Logo" class="footer-logo">
            <p>© 2025 ITA Sport Center. Todos los derechos reservados.</p>
            <p style="margin-top:10px; font-size: 0.8rem; opacity: 0.6; letter-spacing: 2px;">IMAGINA • TRANSFORMA • ACTÚA</p>
        </div>
    </footer>
`;

// --- FUNCIÓN MAESTRA (PINTAR TODO) ---
function iniciarLayout() {
    console.log("🚀 EJECUTANDO LAYOUT: Pintando menú y footer...");

    // a) Limpieza de seguridad
    const oldNav = document.querySelector('nav');
    if(oldNav) oldNav.remove();
    const oldFooter = document.querySelector('footer');
    if(oldFooter) oldFooter.remove();

    // b) Inyectar HTML
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
        .then(() => console.log("Usuario cargado"))
        .catch(() => console.log("Modo invitado"));
    
    // e) Activar Modo App iPhone (Opcional, si lo quieres)
    activarModoApp();
}

// 4. EL DETECTOR INTELIGENTE (ESTO ES LO QUE ARREGLA EL PROBLEMA)
// Preguntamos: "¿La página sigue cargando?"
if (document.readyState === "loading") {
    // Si sigue cargando, esperamos.
    document.addEventListener("DOMContentLoaded", iniciarLayout);
} else {
    // Si ya terminó (que es lo que te está pasando), ejecutamos YA.
    iniciarLayout();
}

// 5. MODO APP Y MÓVIL
window.toggleMenu = function() {
    var menu = document.getElementById("navLinks");
    if (menu) menu.classList.toggle("active");
}

function activarModoApp() {
    const metas = [
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
    ];
    metas.forEach(m => {
        if (!document.querySelector(`meta[name="${m.name}"]`)) {
            const meta = document.createElement('meta');
            meta.name = m.name; meta.content = m.content;
            document.head.appendChild(meta);
        }
    });
    document.addEventListener('click', function(e) {
        const anchor = e.target.closest('a');
        if (anchor && anchor.href && anchor.target !== '_blank' && anchor.hostname === window.location.hostname) {
            e.preventDefault();
            window.location.href = anchor.href;
        }
    }, false);
}