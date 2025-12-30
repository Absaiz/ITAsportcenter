// layout.js - VERSIÓN "CLEAN" (Footer Minimalista + Legal + WhatsApp)

// 1. FORZAR LA CARGA DE ESTILOS Y MANIFEST
const version = Date.now(); 

// A) Estilos
const linkCSS = document.createElement("link");
linkCSS.rel = "stylesheet";
linkCSS.href = `style.css?v=${version}`; 
document.head.appendChild(linkCSS);

// B) Manifest
const linkManifest = document.createElement("link");
linkManifest.rel = "manifest";
linkManifest.href = `manifest.json?v=${version}`; 
document.head.appendChild(linkManifest);

// C) Metaetiquetas para iPhone
const metaApple = document.createElement("meta"); metaApple.name = "apple-mobile-web-app-capable"; metaApple.content = "yes"; document.head.appendChild(metaApple);
const metaStatus = document.createElement("meta"); metaStatus.name = "apple-mobile-web-app-status-bar-style"; metaStatus.content = "black-translucent"; document.head.appendChild(metaStatus);

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
            <a href="index.html#sobre-mi">SOBRE MÍ</a>
            <a href="filosofia.html">Filosofía</a>
            <a href="entrenar.html">Rutinas</a>
            <a href="reservas.html">Horarios</a>
            <a href="planes.html">Tarifas</a>
            <a href="contacto.html">Contacto</a>
            <a href="login.html" class="btn-login">ÁREA SOCIOS</a>
        </div>
    </nav>
`;

// 3. EL FOOTER HTML (VERSIÓN LIMPIA / MINIMALISTA)
const footerHTML = `
    <footer style="background-color: #000; padding: 20px 0; border-top: 1px solid #222; text-align: center; font-size: 0.75rem; color: #666; margin-top: auto;">
        <p style="margin-bottom: 8px;">© 2025 ITA Sport Center</p>
        <div>
            <a href="/politica-privacidad.html" style="color: #666; text-decoration: none; margin: 0 8px; transition: color 0.3s;">Privacidad</a>
            <span style="color: #333;">|</span>
            <a href="/cookies.html" style="color: #666; text-decoration: none; margin: 0 8px; transition: color 0.3s;">Cookies</a>
            <span style="color: #333;">|</span>
            <a href="/aviso-legal.html" style="color: #666; text-decoration: none; margin: 0 8px; transition: color 0.3s;">Aviso Legal</a>
        </div>
        <style>
            footer a:hover { color: #fff !important; } /* Efecto hover blanco sutil */
        </style>
    </footer>
`;

// 4. EL BOTÓN DE WHATSAPP FLOTANTE
const whatsappHTML = `
    <style>
        .wa-float {
            position: fixed; bottom: 20px; right: 20px;
            background-color: #25d366; color: white;
            width: 60px; height: 60px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-size: 30px; box-shadow: 2px 2px 10px rgba(0,0,0,0.3);
            z-index: 1000; transition: 0.3s; text-decoration: none;
        }
        .wa-float:hover { transform: scale(1.1); background-color: #1ebd56; }
        .wa-icon { width: 35px; height: 35px; fill: white; }
    </style>
    
    <a href="https://wa.me/34606463397?text=Hola%20ITA,%20quiero%20más%20información%20sobre%20los%20entrenamientos." class="wa-float" target="_blank">
        <svg class="wa-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-4-10.5-6.7z"/>
        </svg>
    </a>
`;

// 5. FUNCIÓN DE COOKIES (Separada y limpia)
function iniciarCookies() {
    const consent = localStorage.getItem("cookieConsent");
    if (consent) return; 

    const cookieBanner = document.createElement("div");
    cookieBanner.id = "cookie-banner";
    cookieBanner.className = "cookie-container";
    
    cookieBanner.innerHTML = `
        <p>
            Usamos cookies para que puedas entrenar fuerte y navegar mejor. 
            Si sigues aquí, asumimos que aceptas nuestra <a href="/politica-privacidad.html">política de privacidad</a>.
        </p>
        <div class="cookie-buttons">
            <button id="accept-cookies" class="btn-cookie btn-accept">ACEPTAR Y ENTRENAR</button>
            <button id="reject-cookies" class="btn-cookie btn-reject">Solo funcionales</button>
        </div>
    `;

    document.body.appendChild(cookieBanner);

    setTimeout(() => { cookieBanner.classList.add("show"); }, 500);

    document.getElementById("accept-cookies").addEventListener("click", () => {
        localStorage.setItem("cookieConsent", "accepted");
        cookieBanner.classList.remove("show");
    });

    document.getElementById("reject-cookies").addEventListener("click", () => {
        localStorage.setItem("cookieConsent", "rejected");
        cookieBanner.classList.remove("show");
    });
}

// --- FUNCIÓN MAESTRA ---
function iniciarLayout() {
    console.log("🚀 APP LISTA: Menu + Footer Clean + WhatsApp + Cookies");

    // Limpieza de elementos antiguos
    const oldNav = document.querySelector('nav'); if(oldNav) oldNav.remove();
    const oldFooter = document.querySelector('footer'); if(oldFooter) oldFooter.remove();
    const oldWa = document.querySelector('.wa-float'); if(oldWa) oldWa.remove();

    // Inyectar HTML Estructural
    document.body.insertAdjacentHTML('afterbegin', menuHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    document.body.insertAdjacentHTML('beforeend', whatsappHTML);

    // Iniciar Lógica de Cookies
    iniciarCookies();

    // Marcar enlace activo en el menú
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if(!link.href.includes('#') && link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Cargar lógica de usuario (Auth)
    import(`./auth.js?v=${version}`)
        .then(() => console.log("Usuario cargado"))
        .catch(() => console.log("Modo invitado"));
}

// 6. EJECUCIÓN INMEDIATA
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarLayout);
} else {
    iniciarLayout();
}

// 7. FUNCIONES GLOBALES
window.toggleMenu = function() {
    var menu = document.getElementById("navLinks");
    if (menu) menu.classList.toggle("active");
}

// ==========================================
// 📊 INTEGRACIÓN GOOGLE ANALYTICS (GA4)
// ==========================================
(function cargarAnalytics() {
    // 1. TU ID DE MEDICIÓN (Pégalo aquí dentro de las comillas)
    const GA_ID = 'GTM-M8KPV5QJ'; 

    // 2. Inyectamos la librería de Google en el <head>
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    // 3. Inicializamos el comando de tracking
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', GA_ID);
    
    console.log("📊 Analytics activado:", GA_ID);
})();

document.addEventListener('click', function(e) {
    const anchor = e.target.closest('a');
    if (anchor && anchor.href && anchor.target !== '_blank' && anchor.hostname === window.location.hostname) {
        // Navegación fluida estándar
    }
}, false);