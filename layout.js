// layout.js - VERSIÓN "APP NATIVA" (Anti-Caché + iOS Fix)

// 1. FORZAR LA CARGA DE ESTILOS Y MANIFEST (Anti-Caché)
const version = Date.now(); 

// A) Estilos
const linkCSS = document.createElement("link");
linkCSS.rel = "stylesheet";
linkCSS.href = `style.css?v=${version}`; 
document.head.appendChild(linkCSS);

// B) Manifest (Vital para iPhone/Android)
const linkManifest = document.createElement("link");
linkManifest.rel = "manifest";
linkManifest.href = `manifest.json?v=${version}`; // Forzamos versión también aquí
document.head.appendChild(linkManifest);

// C) Metaetiquetas para iPhone (Full Screen)
const metaApple = document.createElement("meta");
metaApple.name = "apple-mobile-web-app-capable";
metaApple.content = "yes";
document.head.appendChild(metaApple);

const metaStatus = document.createElement("meta");
metaStatus.name = "apple-mobile-web-app-status-bar-style";
metaStatus.content = "black-translucent";
document.head.appendChild(metaStatus);


// 2. EL MENÚ HTML
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

// 3. EL FOOTER HTML
const footerHTML = `
    <footer>
        <div class="container">
            <img src="imagen/logo.png" alt="ITA Small Logo" class="footer-logo">
            <p>© 2025 ITA Sport Center. Todos los derechos reservados.</p>
            <p style="margin-top:10px; font-size: 0.8rem; opacity: 0.6; letter-spacing: 2px;">IMAGINA • TRANSFORMA • ACTÚA</p>
        </div>
    </footer>
`;

// --- FUNCIÓN MAESTRA ---
function iniciarLayout() {
    console.log("🚀 MODO APP: Iniciando interfaz...");

    // Limpieza previa
    const oldNav = document.querySelector('nav');
    if(oldNav) oldNav.remove();
    const oldFooter = document.querySelector('footer');
    if(oldFooter) oldFooter.remove();

    // Inyectar HTML
    document.body.insertAdjacentHTML('afterbegin', menuHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // Marcar activo
    const currentPage = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Cargar lógica de usuarios (siempre fresca)
    import(`./auth.js?v=${version}`)
        .then(() => console.log("Usuario cargado"))
        .catch(() => console.log("Modo invitado"));
}

// 4. EJECUCIÓN INMEDIATA (Sin esperar)
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarLayout);
} else {
    iniciarLayout();
}

// 5. FUNCIONES GLOBALES
window.toggleMenu = function() {
    var menu = document.getElementById("navLinks");
    if (menu) menu.classList.toggle("active");
}

// 6. HACK NAVEGACIÓN IOS (Se ejecuta YA, no espera a cargar)
// Esto intercepta cualquier clic en un enlace y obliga al iPhone a no abrir Safari
document.addEventListener('click', function(e) {
    // Buscamos si el clic fue en un enlace (<a>)
    const anchor = e.target.closest('a');
    
    // Si es un enlace interno y no es para abrir en pestaña nueva
    if (anchor && anchor.href && anchor.target !== '_blank' && anchor.hostname === window.location.hostname) {
        
        // Evitamos que el navegador haga lo suyo (abrir ventana nueva)
        e.preventDefault();
        
        // Cambiamos la URL manualmente dentro de la misma ventana
        window.location.href = anchor.href;
    }
}, false);