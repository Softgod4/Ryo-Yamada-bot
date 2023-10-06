import { initializeAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBEaFqfdLe5s9mUveTULMTFKcD1P-EKcX4",
    authDomain: "hentai-rio-bot.firebaseapp.com",
    databaseURL: "https://hentai-rio-bot-default-rtdb.firebaseio.com",
    projectId: "hentai-rio-bot",
    storageBucket: "hentai-rio-bot.appspot.com",
    messagingSenderId: "289038463720",
    appId: "1:289038463720:web:de156b06f08052076a4f5d"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
