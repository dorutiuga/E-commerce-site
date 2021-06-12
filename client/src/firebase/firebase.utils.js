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
  //prin aceasta functie, preluam utilizatorul din auth(logat cu google) si il v-om atasa coletiei users
  export const dateUtilizator = async (userAuth, additionalData) => { //functie anonima

    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          
          ...additionalData //afiseaza o lista de paraemtrii
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };
  export const getUserCartRef = async userId => {
    const cartsRef = firestore.collection('carts').where('userId', '==', userId);
    const snapShot = await cartsRef.get();
  
    if (snapShot.empty) {
      const cartDocRef = firestore.collection('carts').doc();
      await cartDocRef.set({ userId, cartItems: [] });
      return cartDocRef;
    } else {
      return snapShot.docs[0].ref;
    }
  };
  
  export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
  ) => {
    const collectionRef = firestore.collection(collectionKey);
  
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });
  
    return await batch.commit();
  };
 
 export const convertCollectionsSnapshotToMap =(collections) => {
      const trasformedCollection = collections.docs.map(doc => {
        const {title , items } = doc.data();

        return {
          routeName : encodeURI(title.toLowerCase()),
          id : doc.id,
          title, 
          items
        };
      })
      return trasformedCollection.reduce((accumulator, collection)=> {
      accumulator[collection.title.toLowerCase()] =collection;
      return accumulator;
    }, {})
  };

export const getUtilizatorCurent = () =>{
  return new Promise((resolve, reject) =>{
    const unsubscribe = auth.onAuthStateChanged(userAuth =>{
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}

  export const auth  = firebase.auth();
  export const firestore = firebase.firestore();
// creaza un serviciu de autentificare Google
 export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)


  export default firebase;