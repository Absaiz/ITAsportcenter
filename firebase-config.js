// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// TU CONFIGURACIÓN (Limpia)
const firebaseConfig = {
    apiKey: "AIzaSyAk_Y0WkyfjeRpxHFTfN5Aa3gf4meDcc80",
    authDomain: "itasportcenter-a1b2c.firebaseapp.com",
    projectId: "itasportcenter-a1b2c",
    storageBucket: "itasportcenter-a1b2c.firebasestorage.app",
    messagingSenderId: "1035102731718",
    appId: "1:1035102731718:web:4386a4da8c363458b806c7"
};

// INICIALIZAR FIREBASE
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);