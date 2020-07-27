import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import SitioPeliculas from './componentes/SitioPeliculas';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // Archivo CSS de Bootstrap 4 
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'; // Archivo Javascript de Bootstrap 4 
import '../node_modules/bootstrap/dist/css/bootstrap.css';


import {FirebaseAppProvider} from 'reactfire'
import firebaseConfig from './firebase-config'

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Suspense fallback={'Conectando la app...'}>
        <SitioPeliculas/>
      </Suspense>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
