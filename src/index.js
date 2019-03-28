import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import Firebase, { FirebaseContext } from './Components/Firebase';
import './styles.css';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  rootElement
);
