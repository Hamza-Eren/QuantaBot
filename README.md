# QuantaBot

#### > Türkçe
Bu kod OpenAI API'ını, Firebase Realtime Databese'ini, React ve Electron Frameworklerini kullanam bir masaüstü chatbot kodudur.

Kullanım için izlenecek adımlar;
- İlk olarak bir firebase projesi oluşturup içinde realtime database oluşturun.
- Sonra react/src/FirebaseInit.js dosyasındaki firebaseConfig kısmını doldurun.
- react/src/ResponseBot.js dosyasının 11. satırındaki API_KEY yerine kendi Api keyinizi koyun.
- Konsole npm run build yazarak react uygulamanızın build edilmesini bekleyin.
- Build dosyanızı alarak electron/src'nin içine koyun.
- electron/src/build/asset-manifest.json içindeki "files" kısmında yazan dosya yollarının başına "." koyun. (ör: "main.css": "./static/css/main.131ed49a.css" gibi olmalı)
- electron/src/build/index.html dosyasının içine aşağıdaki <script> etiketini yapıştırın.

<script type="module">
  // Gerekli modüllerin import edilmesi
  const { ipcRenderer } = require('electron');
  const initializeApp = require('firebase/app').initializeApp;
  const { getDatabase, ref, remove, child } = require('firebase/database');

  // Firebase konfigürasyon bilgileri
  const firebaseConfig = FIREBASE_CONFIG

  // Firebase başlatma işlemi
  initializeApp(firebaseConfig);

  // Mesajları silme işlemi
  ipcRenderer.on('clear-chat', (event) => {
      const dbRef = ref(getDatabase());
      remove(child(dbRef, 'message'), null);
      setTimeout(() => {
          event.sender.send('refresh-chat');
      }, 1500);
  });
</script>

- Tebrikler. Kodunuz hazır.

---
#### > English
This code is a desktop chatbot code that uses OpenAI API, Firebase Realtime Database, React and Electron Frameworks.

Steps to follow for use;
- First, create a firebase project and create a realtime database in it.
- Then fill in the firebaseConfig section in the react/src/FirebaseInit.js file.
- Change the API_KEY in line 11 of the react/src/ResponseBot.js file to your own Api key.
- Wait for your React application to be built by typing npm run build in the console.
- Take your build file and put it in electron/src.
- In the "files" section of the electron/src/build/asset-manifest.json file, edit the file paths to start with ".". (ex: "main.css": should be like "./static/css/main.131ed49a.css")
- Paste the following <script> tag into the electron/src/build/index.html file.

<script type="module">
  // Gerekli modüllerin import edilmesi
  const { ipcRenderer } = require('electron');
  const initializeApp = require('firebase/app').initializeApp;
  const { getDatabase, ref, remove, child } = require('firebase/database');

  // Firebase konfigürasyon bilgileri
  const firebaseConfig = FIREBASE_CONFIG

  // Firebase başlatma işlemi
  initializeApp(firebaseConfig);

  // Mesajları silme işlemi
  ipcRenderer.on('clear-chat', (event) => {
      const dbRef = ref(getDatabase());
      remove(child(dbRef, 'message'), null);
      setTimeout(() => {
          event.sender.send('refresh-chat');
      }, 1500);
  });
</script>

- Congratulations. Your code is ready.
