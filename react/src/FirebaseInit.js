// Gerekli importları yapıyoruz.
import { initializeApp } from "firebase/app";

// Firebase projemizin yapılandırma bilgileri.
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Firebase projemizi başlatıyoruz.
initializeApp(firebaseConfig);