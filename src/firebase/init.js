// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-Nlve6qC9jC1N7qAgkRzfP9BRrWavs2M",
  authDomain: "sign-up-c1912.firebaseapp.com",
  projectId: "sign-up-c1912",
  storageBucket: "sign-up-c1912.appspot.com",
  messagingSenderId: "391468494350",
  appId: "1:391468494350:web:310f4e7155773759e8565f",
  measurementId: "G-JX1ZHGD2C2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();