document.addEventListener("DOMContentLoaded", () => {
    
    // 1. INYECTAR BARRA DE NAVEGACIÓN (HEADER)
    const headerHTML = `
    <nav style="background-color: #000; padding: 15px 20px; border-bottom: 2px solid #333; position: sticky; top: 0; z-index: 1000;">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
            
            <a href="index.html" style="text-decoration: none; display: flex; align-items: center; gap: 10px;">
                <img src="imagen/logoico.png" alt="ITA Logo" style="height: 40px;">
                <span style="font-family: 'Oswald', sans-serif; font-size: 1.5rem; color: white; letter-spacing: 1px;">ITA <span style="color: #ff007f;">SPORT</span></span>
            </a>

            <div class="desktop-menu" style="display: none;">
                <a href="index.html" class="nav-link">INICIO</a>
                <a href="reservas.html" class="nav-link">RESERVAS</a>
                <a href="entrenar.html" class="nav-link" style="color:#ff007f;">ENTRENAR</a> <a href="perfil.html" class="nav-link">PERFIL</a>
            </div>

            <button id="mobileMenuBtn" style="background: none; border: none; color: white; font-size: 2rem; cursor: pointer; display: block;">
                <i class="bi bi-list"></i>
            </button>
        </div>

        <div id="mobileMenu" style="display: none; background: #111; padding: 20px; text-align: center; border-top: 1px solid #333;">
            <a href="index.html" class="mobile-link">INICIO</a>
            <a href="reservas.html" class="mobile-link">RESERVAS</a>
            <a href="entrenar.html" class="mobile-link" style="color:#ff007f;">ENTRENAR</a>
            <a href="perfil.html" class="mobile-link">PERFIL</a>
            <a href="#" id="btnLogoutMobile" class="mobile-link" style="color: #ff4444; margin-top: 20px; display:none;">CERRAR SESIÓN</a>
        </div>
    </nav>
    `;

    // 2. INYECTAR ESTILOS CSS DEL MENÚ
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        /* ESTILOS DE NAVEGACIÓN */
        .nav-link { color: #ccc; text-decoration: none; margin-left: 20px; font-family: 'Oswald', sans-serif; font-size: 1.1rem; transition: 0.3s; }
        .nav-link:hover, .nav-link.active { color: white; text-shadow: 0 0 10px #ff007f; }
        
        .mobile-link { display: block; color: white; text-decoration: none; font-family: 'Oswald'; font-size: 1.5rem; margin-bottom: 20px; border-bottom: 1px solid #333; padding-bottom: 10px; }
        
        @media (min-width: 768px) {
            .desktop-menu { display: block !important; }
            #mobileMenuBtn { display: none !important; }
            #mobileMenu { display: none !important; }
        }
    `;
    document.head.appendChild(styleSheet);

    // 3. LIMPIEZA PREVIA (Para evitar duplicados si recarga)
    const oldNav = document.querySelector('nav'); 
    if(oldNav) oldNav.remove();

    // Inyectar Menú Nuevo
    document.body.insertAdjacentHTML("afterbegin", headerHTML);

    // 4. INYECTAR BOTÓN WHATSAPP
    const whatsappHTML = `
    <a href="https://wa.me/34600000000" target="_blank" style="position: fixed; bottom: 20px; right: 20px; background-color: #25d366; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.5); z-index: 9999; transition: transform 0.3s;">
        <i class="bi bi-whatsapp"></i>
    </a>
    `;
    // Limpiar whatsapp viejo
    const oldWa = document.querySelector('a[href*="wa.me"]');
    if(oldWa) oldWa.remove();
    document.body.insertAdjacentHTML("beforeend", whatsappHTML);

    // 5. INYECTAR FOOTER
    const footerHTML = `
    <footer style="background: #111; color: #888; text-align: center; padding: 20px; margin-top: 50px; border-top: 1px solid #333; font-size: 0.9rem;">
        <p>&copy; 2024 ITA SPORT CENTER. Todos los derechos reservados.</p>
        <p style="font-size: 0.8rem;">Imagina · Transforma · Actúa</p>
    </footer>
    `;
    // Limpiar footer viejo
    const oldFooter = document.querySelector('footer');
    if(oldFooter) oldFooter.remove();
    document.body.insertAdjacentHTML("beforeend", footerHTML);

    // 6. LÓGICA DE INTERACCIÓN (Activar links y Abrir menú)
    
    // Marcar enlace activo según la página
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll('.nav-link, .mobile-link');
    
    links.forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
            link.style.color = "#ff007f"; // Rosa ITA
        }
    });

    // Toggle Menú Móvil
    const btnMenu = document.getElementById('mobileMenuBtn');
    const menuDiv = document.getElementById('mobileMenu');
    
    if(btnMenu && menuDiv) {
        btnMenu.addEventListener('click', () => {
            if (menuDiv.style.display === "none") {
                menuDiv.style.display = "block";
                btnMenu.innerHTML = '<i class="bi bi-x-lg"></i>'; // Cambiar icono a X
            } else {
                menuDiv.style.display = "none";
                btnMenu.innerHTML = '<i class="bi bi-list"></i>'; // Cambiar icono a Lista
            }
        });
    }

    console.log("APP LISTA: Menu + Footer + WhatsApp cargados correctamente.");
});