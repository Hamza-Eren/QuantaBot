// Firebase'e veri göndermek için sendFirebase fonksiyonunu import ediyoruz.
import sendFirebase from "./sendFirebase";

// ResponseBot fonksiyonu oluşturuyoruz.
async function ResponseBot(prompt, id) {
    // API'ya fetch ile istek yolluyoruz.
    await fetch("https://api.openai.com/v1/chat/completions", {  // istek yollanacak url
        method: "POST", // istek tipi
        headers: {
            "Content-Type": "application/json", // içerik tipi
            "Authorization": "Bearer API_KEY" // yetkilendirme için API anahtarı
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo", // model adı
            "messages": [{"role": "user", "content": prompt}] // mesaj içeriği
        })
    }).then((data) => {
        return data.json(); // gelen veriyi json formatına çeviriyoruz.
    }).then((data) => {
        console.log(data);
        sendFirebase(prompt, data.choices[0].message.content, id); // Firebase'e veriyi gönderiyoruz.
    })
}

// ResponseBot fonksiyonunu dışa aktarıyoruz.
export default ResponseBot;