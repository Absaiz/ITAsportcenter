// user-logic.js - VERSIÓN FINAL (Navegación correcta)
import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


console.log("Cargando lógica de usuario...");

const actualizarBoton = (user) => {
    // Buscamos el botón del menú
    const btnLogin = document.querySelector('.btn-login');
    
    // Si el menú aún no se ha pintado, esperamos un poco y reintentamos
    if (!btnLogin) {
        setTimeout(() => actualizarBoton(user), 200);
        return;
    }

    if (user) {
        // --- CASO 1: USUARIO CONECTADO ---
        // Queremos que vaya al perfil, NO que cierre sesión
        console.log("Usuario conectado: ", user.email);

        btnLogin.textContent = "MI PERFIL";
        btnLogin.href = "perfil.html"; // Esto hace que vaya a la página
        
        // ESTILOS: Lo ponemos rosa para que destaque
        btnLogin.style.backgroundColor = "var(--accent-pink)";
        btnLogin.style.borderColor = "var(--accent-pink)";
        btnLogin.style.color = "white";
        
        // ¡IMPORTANTE! Borramos cualquier evento antiguo (como el popup de cerrar sesión)
        btnLogin.onclick = null; 

    } else {
        // --- CASO 2: USUARIO NO CONECTADO ---
        // Queremos que vaya al login
        btnLogin.textContent = "ÁREA SOCIOS";
        btnLogin.href = "login.html";
        
        // ESTILOS: Transparente
        btnLogin.style.backgroundColor = "transparent";
        btnLogin.style.borderColor = "white";
        btnLogin.style.color = "white";
        
        btnLogin.onclick = null;
    }
};

// Escuchamos a Firebase para saber si entra o sale alguien
onAuthStateChanged(auth, (user) => {
    actualizarBoton(user);
});