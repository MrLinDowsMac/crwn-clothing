import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBIrHm9GyoSLByBawgU5fDlacmqzxVo4KY",
    authDomain: "crwn-db-1b0dd.firebaseapp.com",
    databaseURL: "https://crwn-db-1b0dd.firebaseio.com",
    projectId: "crwn-db-1b0dd",
    storageBucket: "crwn-db-1b0dd.appspot.com",
    messagingSenderId: "1046567685669",
    appId: "1:1046567685669:web:22447e766846a879a179cc",
    measurementId: "G-E3TMXRYSVC"
  };

  firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Google Auth
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

export default firebase;