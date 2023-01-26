import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6SlgUaSE-86IassKIYUkWTIMyl1xaog4",
  authDomain: "compte-a-rebours-8e3dc.firebaseapp.com",
  projectId: "compte-a-rebours-8e3dc",
  storageBucket: "compte-a-rebours-8e3dc.appspot.com",
  messagingSenderId: "973611881855",
  appId: "1:973611881855:web:e4b3a7ba56082adae4364a",
  measurementId: "G-39P5LY3MZP",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App);

// const analytics = getAnalytics(app);

app.use(router);

app.mount("#app");
