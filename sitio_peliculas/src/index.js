import React, { Component } from 'react';
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
import { data } from 'jquery';

class Index extends Component{
  constructor(){
    super()
    this.state = {
      peliculas: [],
      terminoBuscado: ''
    }
    this.apiKey = process.env.REACT_APP_API
  }
  handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.terminoBuscado}`)
    .then(data => data.json())
    .then(data => {
      console.log(data)
      this.setState({peliculas: [...data.results]})
    })
  }
  handleChange = (e) => {
    this.setState({terminoBuscado: e.target.value})
  }
  render(){
    return {
    }
  }
}

ReactDOM.render(
  <React.StrictMode>
    <BarraNavegacion/>
    <Grid>
      <Grid.Column className="col-8">
        <Buscador handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
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
