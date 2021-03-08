import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAEeNKM-9EocDf_vYK6rsdd27t7DKYRf04",
    authDomain: "pr-mebel-588df.firebaseapp.com",
    databaseURL: "https://pr-mebel-588df.firebaseio.com",
    projectId: "pr-mebel-588df",
    storageBucket: "pr-mebel-588df.appspot.com",
    messagingSenderId: "1062373858201",
    appId: "1:1062373858201:web:fb4168726839dea15e9108",
    measurementId: "G-YF3V9BR0G9"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const { storage, firestore } = firebase;