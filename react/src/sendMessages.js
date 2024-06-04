// Gerekli importları yapıyoruz.
import ResponseBot from "./ResponseBot";
import sendFirebase from "./sendFirebase";

// Mesaj gönderme fonksiyonu.
function sendMessages(prompt, index) {
    let input = document.querySelector('.input input'); // Kullanıcının girdiği metni alıyoruz.
    input.value = ''; // Input alanını temizliyoruz.
    // Sayfayı aşağı kaydırıyoruz.
    setTimeout(() => {
        var responseArea = document.getElementById("response-area");
        responseArea.scrollTop = responseArea.scrollHeight;
    }, 1000);
    // Firebase'e mesajımızı gönderiyoruz.
    sendFirebase(prompt, '...', index);
    // ResponseBot fonksiyonunu çalıştırıyoruz.
    ResponseBot(prompt, index);
}

// sendMessages fonksiyonunu dışa aktarıyoruz.
export default sendMessages ;