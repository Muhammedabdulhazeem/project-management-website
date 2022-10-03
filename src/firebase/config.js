import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// config
const firebaseConfig = {
    apiKey: "AIzaSyB94X52XgeQnuovty3Pysy8kGoExazhpi8",
    authDomain: "myconnect-site.firebaseapp.com",
    projectId: "myconnect-site",
    storageBucket: "myconnect-site.appspot.com",
    messagingSenderId: "270610706313",
    appId: "1:270610706313:web:13b2683867114d50913b58"
  };

// Initialize firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }