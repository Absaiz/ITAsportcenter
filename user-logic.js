// user-logic.js
import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

console.log("Cargando lógica de usuario...");

// Función para actualizar el botón según el estado
const actualizarBoton = (user) => {
    const btnLogin = document.querySelector('.btn-login');
    
    // Si el botón aún no existe (layout.js no ha terminado), reintentamos en un momento
    if (!btnLogin) {
        setTimeout(() => actualizarBoton(user), 200);
        return;
    }

    if (user) {
        // --- USUARIO LOGUEADO ---
        console.log("Usuario detectado:", user.email);
        btnLogin.textContent = "CERRAR SESIÓN";
        btnLogin.href = "#"; // Ya no es un enlace, es un botón de acción
        btnLogin.style.backgroundColor = "var(--accent-pink)";
        btnLogin.style.borderColor = "var(--accent-pink)";
        btnLogin.style.color = "white";
        
        // Limpiamos eventos anteriores para evitar duplicados y añadimos el de Logout
        // (La forma más limpia de borrar eventos es reemplazar el nodo, pero aquí usaremos onclick directo)
        btnLogin.onclick = (e) => {
            e.preventDefault();
            const confirmar = confirm("¿Quieres cerrar sesión?");
            if (confirmar) {
                signOut(auth).then(() => {
                    // Al salir, recargamos la página para resetear todo
                    window.location.href = "index.html";
                }).catch((error) => console.error("Error al salir:", error));
            }
        };

    } else {
        // --- USUARIO NO LOGUEADO ---
        console.log("No hay usuario activo");
        btnLogin.textContent = "ÁREA SOCIOS";
        btnLogin.href = "login.html";
        btnLogin.style.backgroundColor = "transparent";
        btnLogin.style.borderColor = "white";
        btnLogin.style.color = "white";
        btnLogin.onclick = null; // Quitamos la función de logout
    }
};

// Escuchar cambios en la autenticación (Login/Logout)
onAuthStateChanged(auth, (user) => {
    actualizarBoton(user);
});