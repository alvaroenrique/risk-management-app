/* eslint-disable import/prefer-default-export */
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAm6jBB0CYmIRMxTLTlikxKWTtXpAL8AG4',
  authDomain: 'risk-management-app.firebaseapp.com',
  databaseURL: 'https://risk-management-app.firebaseio.com',
  projectId: 'risk-management-app',
  storageBucket: 'risk-management-app.appspot.com',
  messagingSenderId: '998032579147',
  appId: '1:998032579147:web:55ca6fb4f9abbdb0',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export {db};
