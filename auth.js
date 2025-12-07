// auth.js
import { auth, db } from "./firebase-config.js";
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

        // Guardar datos extra en la base de datos (Firestore)
        await setDoc(doc(db, "usuarios", user.uid), {
            nombre: nombre,
            email: email,
            creditos: 0,        // Empiezan con 0 clases
            rol: "usuario",     // Por defecto son normales
            fechaRegistro: new Date()
        });

        // Actualizar el nombre visible en Auth
        await updateProfile(user, { displayName: nombre });

        alert("¡Cuenta creada con éxito! Bienvenido a ITA.");
        window.location.href = "index.html"; // Redirigir al inicio

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
        window.location.href = "index.html"; // Redirigir al inicio
    } catch (error) {
        console.error("Error:", error);
        alert("Correo o contraseña incorrectos.");
    }
}

// --- FUNCIÓN DE LOGOUT ---
export async function cerrarSesion() {
    try {
        await signOut(auth);
        window.location.href = "login.html";
    } catch (error) {
        console.error("Error al salir:", error);
    }
}

// --- ESCUCHADOR DE ESTADO (Para cambiar el menú si está logueado) ---
// Esto se conecta con layout.js automáticamente
onAuthStateChanged(auth, async (user) => {
    const btnLogin = document.querySelector('.btn-login');
    if (!btnLogin) return;

    if (user) {
        // SI ESTÁ LOGUEADO
        btnLogin.textContent = "MI PERFIL"; // Cambia el texto del botón
        btnLogin.href = "perfil.html";      // Cambia el enlace
        btnLogin.style.backgroundColor = "var(--accent-pink)";
        btnLogin.style.borderColor = "var(--accent-pink)";
    } else {
        // SI NO ESTÁ LOGUEADO
        btnLogin.textContent = "ÁREA SOCIOS";
        btnLogin.href = "login.html";
        btnLogin.style.backgroundColor = "transparent";
    }
});