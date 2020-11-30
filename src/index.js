import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC85RoZcigrr8PONAFywW3aC3yYzZo99iY",
  authDomain: "assetmanbosch.firebaseapp.com",
  databaseURL: "https://assetmanbosch.firebaseio.com",
  projectId: "assetmanbosch",
  storageBucket: "assetmanbosch.appspot.com",
  messagingSenderId: "46771605988",
  appId: "1:46771605988:web:2bd0d23ce05a555d7af7f1",
  measurementId: "G-WSM7SWQPQY"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

