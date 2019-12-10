import * as firebase from "firebase/app";
import "firebase/firestore";

// Agregar configuración firebase:
var firebaseConfig = {
    apiKey: "AIzaSyDYbuUEj6nfpxBVvkt0L1QdcLB8InsVlEQ",
    authDomain: "tareasa-d3c0c.firebaseapp.com",
    databaseURL: "https://tareasa-d3c0c.firebaseio.com",
    projectId: "tareasa-d3c0c",
    storageBucket: "tareasa-d3c0c.appspot.com",
    messagingSenderId: "804055602983",
    appId: "1:804055602983:web:8eb9fb14869c92821e7b02"
  };

let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export { db, firebase };