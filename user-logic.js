// user-logic.js - CON DETECCIÓN DE ADMIN
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

console.log("Cargando lógica de usuario...");

const actualizarMenu = async (user) => {
    // 1. Buscamos el botón del perfil (el último del menú)
    const btnLogin = document.querySelector('.btn-login');
    const navLinks = document.getElementById('navLinks');
    
    // Si el menú aún no se ha pintado, esperamos un poco
    if (!btnLogin || !navLinks) {
        setTimeout(() => actualizarMenu(user), 200);
        return;
    }

    if (user) {
        // --- USUARIO LOGUEADO ---
        btnLogin.textContent = "MI PERFIL";
        btnLogin.href = "perfil.html";
        btnLogin.style.backgroundColor = "var(--accent-pink)";
        btnLogin.style.borderColor = "var(--accent-pink)";
        btnLogin.style.color = "white";
        btnLogin.onclick = null; 

        // --- ZONA ADMIN (La Magia) ---
        try {
            // Preguntamos a la base de datos qué rol tiene este usuario
            const docRef = doc(db, "usuarios", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                
                // Si el usuario tiene rol "admin", inyectamos el botón
                if (data.rol === 'admin') {
                    // Evitamos duplicados (si ya existe, no lo creamos otra vez)
                    if (!document.getElementById('adminBtnLink')) {
                        const adminBtn = document.createElement('a');
                        adminBtn.id = 'adminBtnLink';
                        adminBtn.href = 'admin.html';
                        adminBtn.innerText = 'ADMINISTRACIÓN';
                        adminBtn.style.color = '#ff4444'; // Color rojo para destacar
                        adminBtn.style.fontWeight = 'bold';
                        
                        // Lo insertamos justo antes del botón de perfil
                        navLinks.insertBefore(adminBtn, btnLogin);
                    }
                }
            }
        } catch (error) {
            console.error("Error verificando admin:", error);
        }

    } else {
        // --- USUARIO NO LOGUEADO ---
        btnLogin.textContent = "ÁREA SOCIOS";
        btnLogin.href = "login.html";
        btnLogin.style.backgroundColor = "transparent";
        btnLogin.style.borderColor = "white";
        btnLogin.style.color = "white";

        // Si había botón de admin, lo borramos (por seguridad visual)
        const adminBtn = document.getElementById('adminBtnLink');
        if(adminBtn) adminBtn.remove();
    }
};

// Escuchamos cambios
onAuthStateChanged(auth, (user) => {
    actualizarMenu(user);
});