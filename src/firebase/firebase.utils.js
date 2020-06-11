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

  export const createUserProfileDocument = async (userAuth, additionalData)=> { //userAuth contans uid, profilepic, email, etc.
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
    //console.log(snapShot);
    return userRef;
  }

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);
  // collectionRef.get();
  // if (collectionRef.exists){
  //   objectsToAdd.map(object => collectionRef.push(object))
  // }

  const batch = firestore.batch(); //batch to perform multiple writes in a single atomic operation (up tp 500)
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    console.log(newDocRef);
    batch.set(newDocRef, obj)
  });

  return await batch.commit()
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
      const {title, items} = doc.data();
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      }
  }
  );

  return transformedCollection.reduce((accumulator, collection) => { 
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator
  },{});
  //console.log(transformedCollection);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Google Auth
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

export default firebase;