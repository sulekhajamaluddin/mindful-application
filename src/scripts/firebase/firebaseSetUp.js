import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBk6nnI13sY-ng5cXVXokibpoCbfAbMku4",
  authDomain: "mindful-application.firebaseapp.com",
  projectId: "mindful-application",
  storageBucket: "mindful-application.appspot.com",
  messagingSenderId: "471838222640",
  appId: "1:471838222640:web:c4d68798c4b56304bf40f5",
};

export const firebaseApp = initializeApp(firebaseConfig);
