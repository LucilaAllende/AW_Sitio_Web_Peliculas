import React, {Component} from 'react';
import Buscador from './Buscador';
import BarraNavegacion from './BarraNavegacion';
import Resultado from './Resultado'
import {Grid} from 'semantic-ui-react';
import './App.css'
import 'react-pro-sidebar/dist/css/styles.css';
import Sidebar from "react-sidebar";
// import MenuIcon from '@material-ui/icons/Menu';
// import IconButton from '@material-ui/core/IconButton';
// import Login from './Login'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

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
        prueba: [],
      }
      this.apiKey = process.env.REACT_APP_API
      this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleGuardarPelicula = this.handleGuardarPelicula.bind(this);
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
            this.setState( {
              peliculas: [...data.results],
              prueba: data.results,
              totalResultados: data.total_results
            })
          }
        })
        console.log("PELICULAAAAAAS");
        console.log(this.state.peliculas);
        console.log("PELICULAAAAAAS");
        console.log(this.state.prueba);
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
      console.log("Log - pelicula------------------")
      console.log(pelicula)
      var peliculaVer = {
        id: pelicula.id,
        nombre: pelicula.title,
        imagen: pelicula.poster_path
      } 
      //verifico si el pelicula esta o no en el listaPeliculas
      var existe = this.state.listaPeliculas.find(elemPelicula => elemPelicula.id === peliculaId)
      console.log("Log - Existe?-------------------")
      console.log(existe)
      if (existe !== undefined && existe !== null) {
          alert("Ya tiene esa peli")
      }else{
        this.setState({
          listaPeliculas: this.state.listaPeliculas.concat([peliculaVer])
        }) 
      }
      console.log("Log - lista de peliculas favoritas")
      console.log(this.state.listaPeliculas)
      return this.state.listaPeliculas
    }

    manejadorClickBorrarElementoListaFavoritos(){
      alert("Implementar borrado de la pelicula de la lista de peliculas a ver.")

    }


    crearElementoListaSidebar(listaPeliculas){
      let paqueteHTML = []
      // Se agrega el titulo a la lista de favoritos.
      if (paqueteHTML.length == 0){
        paqueteHTML.push(<html>
                          <div className="titulo-lista-fav">
                            <h3>Peliculas Favoritas</h3>
                          </div>
                        </html>)
      }
      // Se agrega una pelicula a la lista de favoritos.
      if (listaPeliculas != null){
        console.log("Log - verificar lista ------")
        console.log(listaPeliculas)
        for(let i = 0 ; i < listaPeliculas.length ; i++){
          paqueteHTML.push(<html>
                            <div className="container-pelicula-fav">
                              <p className="waves-effect">
                              <img src={`http://image.tmdb.org/t/p/w185${listaPeliculas[i].imagen}`}  style={{width: "30%", height: "30%"}}/>
                                  {listaPeliculas[i].nombre} 
                                  <IconButton aria-label="delete" className="btn-eliminar-lista-fav" onClick={this.manejadorClickBorrarElementoListaFavoritos}>
                                    <DeleteIcon />
                                  </IconButton>
                              </p>
                            </div>
                            
                            </html>)
        }
      }
      return paqueteHTML
    }

    render(){
      const numeroPaginas = Math.floor(this.state.totalResultados / 20)
      let listaSidebar = this.crearElementoListaSidebar(this.state.listaPeliculas)

      return (
        <>
        <Sidebar
          sidebar={listaSidebar}
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
            peliculas={this.state.peliculas}
            totalResultados={this.state.totalResultados}
            paginaActual={this.state.paginaActual}
            numeroPaginas = {numeroPaginas}
            nextPage={this.nextPage}
            handleGuardarPelicula={this.handleGuardarPelicula}
            />
          </div>                   
          </Grid.Column>
        </Grid>
        </>
        );
    }
}

export default SitoPelicula;