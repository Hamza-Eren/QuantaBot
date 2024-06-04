// Gerekli importları yapıyoruz.
import { getDatabase, ref, set } from "firebase/database";

// Firebase'e veri gönderen fonksiyon.
function sendFirebase(prompt, response, id) {
    // Veritabanı bağlantısını alıyoruz.
    const db = getDatabase();

    // Tarih ve saat bilgilerini çekiyoruz.
    let date = new Date();

    // Tarih ve saat bilgilerini obje olarak ayarlıyoruz.
    let time = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
    }

    // Firebase'e veri gönderiyoruz.
    set(ref(db, 'message/' + id), {
        userMsg: prompt,
        botMsg: response,
        time: time,
    });

    // Sayfayı aşağı kaydırıyoruz.
    setTimeout(() => {
        var responseArea = document.getElementById("response-area");
        responseArea.scrollTop = responseArea.scrollHeight;
    }, 3000);
}

// sendFirebase fonksiyonunu dışa aktarıyoruz.
export default sendFirebase;