import firebase from 'firebase/app';

import 'firebase/firestore';

const firestore = firebase.firestore();
//inlantuind coletiile si documentele
firestore.collection("users").doc("T9aHf1YYPCbTI39vQ0F3").collection("cartItems").doc("4TWSVDULIlBVGo9FWKSc");
// un doc specific cu cale absoluta
firestore.doc('users/T9aHf1YYPCbTI39vQ0F3/cartItems/4TWSVDULIlBVGo9FWKSc');
//o coletie specifica
firestore.collection('users/T9aHf1YYPCbTI39vQ0F3/cartItems')