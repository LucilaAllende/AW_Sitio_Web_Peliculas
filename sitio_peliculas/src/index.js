import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Buscador from './componentes/Buscador';
import BarraNavegacion from './componentes/BarraNavegacion';
import Lista from './componentes/Lista';
import {Grid} from 'semantic-ui-react';


import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // Archivo CSS de Bootstrap 4 
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'; // Archivo Javascript de Bootstrap 4 
import '../node_modules/bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <React.StrictMode>
    <BarraNavegacion/>
    <Grid>
      <Grid.Column className="col-8">
        <Buscador/>
      </Grid.Column>
      <Grid.Column className="col-2">
        <Lista/>
      </Grid.Column>
    </Grid>    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
