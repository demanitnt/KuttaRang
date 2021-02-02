import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCRkOVEYRohp7BEnebTklIFfFaLTzA6ass",
    authDomain: "ranglearn.firebaseapp.com",
    databaseURL: "https://ranglearn-default-rtdb.europe-west1.firebasedatabase.app/"
  };
  firebase.initializeApp(config);
  export const auth = firebase.auth;
  export const db = firebase.database();