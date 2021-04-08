import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCJlSUyxzH0Ms9pahwkmUYIo54SZJDgR-k",
    authDomain: "ecommercedb-2a4e1.firebaseapp.com",
    projectId: "ecommercedb-2a4e1",
    storageBucket: "ecommercedb-2a4e1.appspot.com",
    messagingSenderId: "763283060175",
    appId: "1:763283060175:web:67786c29647c58c5f40eba",
    measurementId: "G-7S7GY4Y85X"
  };

  firebase.initializeApp(config);

  export const auth  = firebase.auth();
  export const firestore = firebase.firestore();
// creaza un serviciu de autentificare Google
  const provider = new firebase.auth.GoogleAuthProvider();

  //pop-up cu fereastra noua pentru google de selectare a contului
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider)


  export default firebase;
