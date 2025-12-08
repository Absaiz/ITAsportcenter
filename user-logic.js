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

// --- ZONA ADMIN Y IT ---
        try {
            const docRef = doc(db, "usuarios", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                const rol = data.rol;

                // BOTÓN ADMIN (Para 'admin' y 'adminIT')
                if (rol === 'admin' || rol === 'adminIT') {
                    if (!document.getElementById('adminBtnLink')) {
                        const adminBtn = document.createElement('a');
                        adminBtn.id = 'adminBtnLink';
                        adminBtn.href = 'admin.html';
                        adminBtn.innerText = 'ADMIN';
                        adminBtn.style.color = '#ff4444';
                        adminBtn.style.fontWeight = 'bold';
                        navLinks.insertBefore(adminBtn, btnLogin);
                    }
                }

                // ... después del bloque de adminIT ...

                // BOTÓN EDITOR WEB (Para 'admin', 'adminIT' y 'adminWeb')
                if (rol === 'admin' || rol === 'adminIT' || rol === 'adminWeb') 
                {
                    if (!document.getElementById('editorBtnLink')) {
                        const editorBtn = document.createElement('a');
                        editorBtn.id = 'editorBtnLink';
                        editorBtn.href = 'editor-web.html';
                        editorBtn.innerText = '✏️ EDITOR';
                        editorBtn.style.color = '#e1b12c'; // Color amarillo
                        editorBtn.style.fontWeight = 'bold';
                        navLinks.insertBefore(editorBtn, btnLogin);
                    }
                }

                // BOTÓN LOGS (Solo para 'adminIT')
                if (rol === 'adminIT') {
                    if (!document.getElementById('logsBtnLink')) {
                        const logsBtn = document.createElement('a');
                        logsBtn.id = 'logsBtnLink';
                        logsBtn.href = 'it-logs.html';
                        logsBtn.innerText = '🕵️ LOGS';
                        logsBtn.style.color = '#00d2d3'; // Un color azul cian "Matrix"
                        logsBtn.style.fontWeight = 'bold';
                        navLinks.insertBefore(logsBtn, btnLogin);
                    }
                }
            }
        } catch (error) { console.error(error); }

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