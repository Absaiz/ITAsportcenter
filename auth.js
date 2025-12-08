// auth.js
import { auth, db } from "./firebase-config.js";
import { registrarLog } from "./logger.js"; // <--- 1. ¡IMPORTANTE! FALTABA ESTA LÍNEA

import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// --- FUNCIÓN DE REGISTRO ---
export async function registrarUsuario(email, password, nombre) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Guardar datos extra en la base de datos
        await setDoc(doc(db, "usuarios", user.uid), {
            nombre: nombre,
            email: email,
            creditos: 0,
            rol: "usuario",
            fechaRegistro: new Date()
        });

        await updateProfile(user, { displayName: nombre });

        // (Opcional) También podemos registrar el registro
        registrarLog(email, "REGISTRO", "Nuevo usuario registrado");

        alert("¡Cuenta creada con éxito! Bienvenido a ITA.");
        window.location.href = "index.html";

    } catch (error) {
        console.error("Error:", error);
        if(error.code === 'auth/email-already-in-use') alert("Este correo ya está registrado.");
        else if(error.code === 'auth/weak-password') alert("La contraseña debe tener al menos 6 caracteres.");
        else alert("Error al registrarse: " + error.message);
    }
}

// --- FUNCIÓN DE LOGIN ---
export async function iniciarSesion(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);

        // <--- 2. ¡ESTO ES LO QUE HACE QUE SALGA EN EL LOG!
        registrarLog(email, "LOGIN", "Inicio de sesión exitoso");
        
        window.location.href = "index.html"; 
    } catch (error) {
        console.error("Error:", error);
        // (Opcional) Registrar intentos fallidos
        registrarLog(email, "ERROR_LOGIN", "Intento fallido"); 
        alert("Correo o contraseña incorrectos.");
    }
}

// --- FUNCIÓN DE LOGOUT ---
export async function cerrarSesion() {
    try {
        // (Opcional) Registrar salida
        if (auth.currentUser) {
            registrarLog(auth.currentUser.email, "LOGOUT", "Cierre de sesión");
        }
        await signOut(auth);
        window.location.href = "login.html";
    } catch (error) {
        console.error("Error al salir:", error);
    }
}

// --- ESCUCHADOR DE ESTADO ---
onAuthStateChanged(auth, async (user) => {
    const btnLogin = document.querySelector('.btn-login');
    if (!btnLogin) return;

    if (user) {
        btnLogin.textContent = "MI PERFIL"; 
        btnLogin.href = "perfil.html";     
        btnLogin.style.backgroundColor = "var(--accent-pink)";
        btnLogin.style.borderColor = "var(--accent-pink)";
    } else {
        btnLogin.textContent = "ÁREA SOCIOS";
        btnLogin.href = "login.html";
        btnLogin.style.backgroundColor = "transparent";
    }
});