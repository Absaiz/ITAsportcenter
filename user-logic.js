// user-logic.js - MEJORADO
import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

console.log("Cargando lógica de usuario...");

const actualizarBoton = (user) => {
    const btnLogin = document.querySelector('.btn-login');
    
    if (!btnLogin) {
        setTimeout(() => actualizarBoton(user), 200);
        return;
    }

    if (user) {
        // --- USUARIO LOGUEADO ---
        // Ahora el botón lleva al PERFIL, no cierra sesión directo
        btnLogin.textContent = "MI CUENTA";
        btnLogin.href = "perfil.html"; 
        btnLogin.style.backgroundColor = "var(--accent-pink)";
        btnLogin.style.borderColor = "var(--accent-pink)";
        btnLogin.style.color = "white";
        
        // Quitamos el evento onclick anterior para que funcione el href
        btnLogin.onclick = null; 

    } else {
        // --- USUARIO NO LOGUEADO ---
        btnLogin.textContent = "ÁREA SOCIOS";
        btnLogin.href = "login.html";
        btnLogin.style.backgroundColor = "transparent";
        btnLogin.style.borderColor = "white";
        btnLogin.style.color = "white";
    }
};

onAuthStateChanged(auth, (user) => {
    actualizarBoton(user);
});