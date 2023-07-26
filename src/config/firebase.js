import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeXLdy1GOlseTwUdfxqZeTfCaRuRnNdpg",
  authDomain: "whatsapp-24ca5.firebaseapp.com",
  projectId: "whatsapp-24ca5",
  storageBucket: "whatsapp-24ca5.appspot.com",
  messagingSenderId: "523757352041",
  appId: "1:523757352041:web:13f96f313692b664d39ef8",
  measurementId: "G-PQ9XVYWY7J",
};
// Initialize Firebase
const init = firebase.initializeApp(firebaseConfig);
export const firebaseAuthentication = init.auth();
