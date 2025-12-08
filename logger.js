// logger.js - EL ESCRIBANO
import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function registrarLog(usuarioEmail, accion, detalles) {
    try {
        await addDoc(collection(db, "logs"), {
            fecha: new Date(), // Guarda hora exacta
            usuario: usuarioEmail || "Anónimo",
            accion: accion,   // Ej: "Login", "Reserva"
            detalles: detalles || "-" // Ej: "Clase Pilates Lunes"
        });
        console.log("📝 Log guardado:", accion);
    } catch (e) {
        console.error("Error guardando log:", e);
    }
}