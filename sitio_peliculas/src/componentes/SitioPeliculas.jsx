import React, {Component} from 'react';
import Buscador from './Buscador';
import BarraNavegacion from './BarraNavegacion';
import Resultado from './Resultado'
import {Grid, Card} from 'semantic-ui-react';
import './App.css'
import 'react-pro-sidebar/dist/css/styles.css';
import Sidebar from "react-sidebar";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

class SitioPeliculas extends Component{
    
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
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleGuardarPelicula = this.handleGuardarPelicula.bind(this);
      
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
      var peliculaVer = {
        id: pelicula.id,
        nombre: pelicula.title,
        imagen: pelicula.poster_path
      } 
      //verifico si el pelicula esta o no en el listaPeliculas
      var existe = this.state.listaPeliculas.find(elemPelicula => elemPelicula.id === peliculaId)
      if (existe !== undefined && existe !== null) {
          alert("Ya tiene esa peli")
      }else{
        this.setState({
          listaPeliculas: this.state.listaPeliculas.concat([peliculaVer])
        }) 
      }

      return this.state.listaPeliculas
    }

    handleQuitarPelicula(peliculaId){
      
      let pelicula = this.state.listaPeliculas.find(elemPelicula => elemPelicula.id === peliculaId);
      let indexPelicula = this.state.listaPeliculas.findIndex(x => x.id === pelicula.id)

      if (pelicula !== undefined && pelicula !== null) {
        this.state.listaPeliculas.splice(indexPelicula, 1)
        this.forceUpdate();
      }else{          
          alert("Ups, usted no tiene esa pelicula en su lista")
      } 
    }


    crearElementoListaSidebar(listaPeliculas){
      let paqueteHTML = []
      // Se agrega el titulo a la lista de favoritos.
      if (paqueteHTML.length === 0){
        paqueteHTML.push(
                        <>
                          <div className="titulo-lista-fav" >
                            <h4>Peliculas</h4>
                          </div>

                          <Card>
                            <Card.Content>
                              Usted no agrego peliculas aun.
                            </Card.Content>
                          </Card>
                        </>
                        )
      }
      // Se agrega una pelicula a la lista de favoritos.
      if (listaPeliculas != null){
        for(let i = 0 ; i < listaPeliculas.length ; i++){
          paqueteHTML.push(
                            <Card className="card-pelicula">
                            <Card.Content>
                                <Card.Header style={{fontSize: 18}}>
                                  <p>{listaPeliculas[i].nombre}  </p>
                                </Card.Header> 
                                <img src={`http://image.tmdb.org/t/p/w185${listaPeliculas[i].imagen}`}  style={{width: "50%", height: "50%"}} alt="Photos"/>                                     
                            </Card.Content>
                            <Card.Content>
                              <IconButton color="primary" aria-label="delete" className="btn-eliminar-lista-fav" onClick={()=>this.handleQuitarPelicula(listaPeliculas[i].id)}>
                                  <DeleteIcon color="inherit"/>
                                </IconButton>
                            </Card.Content>
                            </Card>
                          )
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
          sidebar={<b>{listaSidebar}</b>}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white", height: "100%" } }}
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

export default SitioPeliculas;