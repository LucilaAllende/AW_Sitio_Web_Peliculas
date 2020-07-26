import React, {Component} from 'react';
import Buscador from './Buscador';
import BarraNavegacion from './BarraNavegacion';
import Lista from './Lista';
import Resultado from './Resultado'
import {Grid} from 'semantic-ui-react';
import './App.css'
import 'react-pro-sidebar/dist/css/styles.css';
import Sidebar from "react-sidebar";
// import MenuIcon from '@material-ui/icons/Menu';
// import IconButton from '@material-ui/core/IconButton';
// import Login from './Login'

class SitoPelicula extends Component{
  
    constructor(){
        super();
        this.state={
          termino:'',
          peliculas: [],
          pagina: '',
          sidebarOpen: false,
          totalResultados: 0,
          paginaActual: 1,
          listaPeliculas: [],
        }
        this.apiKey = process.env.REACT_APP_API
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
      }
      // TODO : ¿ Deprecada ?
      scroll =()=>{
        const elemento= document.querySelector('.jumbotron');
        console.timeLog("-----------------")
        console.log(elemento)
        elemento.scrollIntoView({block: "start", behavior: "smooth"});
      }

      onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
      }

      handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.inputBuscador.value){
          fetch(`https://api.themoviedb.org/3/search/movie?api_key=f4ebf0475efbb7e569cbca44092c1d11&query=${this.state.termino}`)
          .then(data => data.json())
          .then(data => {
            if (data){
              this.setState({
                peliculas: [...data.results],
                totalResultados: data.total_results
              })
            }
          })
        }
      }

      handleChange = (e) => {
        this.setState({termino: e.target.value})
      }
    
      nextPage = (numeroPagina) =>{
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=f4ebf0475efbb7e569cbca44092c1d11&query=${this.state.termino}&page=${numeroPagina}`)
          .then(data => data.json())
          .then(data => {
            if (data){
              this.setState({
                peliculas: [...data.results],
                paginaActual: numeroPagina
              })
            }
          })
      }

      handleGuardarPelicula(peliculaId) {
    
        //busco el pelicula en mi lista de productos
        let pelicula = this.state.peliculas.find(elemPelicula => elemPelicula.id === peliculaId);
        let indexPelicula = this.state.peliculas.findIndex(x => x.id === pelicula.id)
    
        var peliculaVer = {
          id: pelicula.id,
          nombre: pelicula.title,
        }
        //verifico si el pelicula esta o no en el listaPeliculas
        var existe = this.state.listaPeliculas.find(elemPelicula => elemPelicula.id === peliculaId)
        if (undefined !== existe && existe !== null) {
          let indexListaPeliculas = this.state.listaPeliculas.findIndex(x => x.id === existe.id)
          this.handlerAgregarProducto(indexListaPeliculas, indexPelicula)    
        }else{
          var copiaState = Object.assign({}, this.state);
          copiaState.peliculas[indexPelicula].stock -= 1
          copiaState.total += 1
          this.setState({total: copiaState.total})
          copiaState.sum += copiaState.peliculas[indexPelicula].precio
          this.setState({sum: copiaState.sum})
          this.setState({
            listaPeliculas: this.state.listaPeliculas.concat([peliculaVer]),
            copiaState
          })
        }
      }

    render(){
      const numeroPaginas = Math.floor(this.state.totalResultados / 20)
      return (
        <>
        <Sidebar
          sidebar={<Lista/>}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white" } }}
        >
        </Sidebar>
        <BarraNavegacion onSetSidebarOpen = {this.onSetSidebarOpen} />
        <Buscador handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
        <Grid>
          <Grid.Column className="col-12 fondo" >
          <div className="row justify-content-center resultado">
            <Resultado 
            imagenes={this.state.imagenes}
            totalResultados={this.state.totalResultados}
            paginaActual={this.state.paginaActual}
            numeroPaginas = {numeroPaginas}
            nextPage={this.nextPage}
            />
          </div>                   
          </Grid.Column>
        </Grid>
        </>
        );
    }
}

export default SitoPelicula;