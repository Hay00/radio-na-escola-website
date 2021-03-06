import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAjKUCNb2NvHaBguYn8p-LkdOdwByRmyok',
  authDomain: 'radio-na-escola.firebaseapp.com',
  databaseURL: 'https://radio-na-escola.firebaseio.com',
  projectId: 'radio-na-escola',
  storageBucket: 'radio-na-escola.appspot.com',
  messagingSenderId: '638550376314',
  appId: '1:638550376314:web:96377d82241436427c60c3',
  measurementId: 'G-BTC16CQHRN',
});

const auth = app.auth();
const db = app.firestore();

export { auth, db };
