import React, {Component} from 'react';
import Buscador from './Buscador';
import BarraNavegacion from './BarraNavegacion';
import Lista from './Lista';
import Resultado from './Resultado'
import {Grid} from 'semantic-ui-react';
import './App.css'
import 'react-pro-sidebar/dist/css/styles.css';
import Sidebar from "react-sidebar";
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

class SitoPelicula extends Component{
  
    constructor(){
        super();
        this.state={
          termino:'',
          imagenes: [],
          peliculas: [],
          pagina: '',
          sidebarOpen: false,
          totalResultados: 0,
          paginaActual: 1,
        }
        this.apiKey = process.env.REACT_APP_API
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
      }
      
      scroll =()=>{
        const elemento= document.querySelector('.jumbotron');
        console.timeLog("-----------------")
        console.log(elemento)
        elemento.scrollIntoView({block: "start", behavior: "smooth"});
      }

      onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
      }
    
      paginaAnterior = ()=>{   
        console.log("paginaAnterior");
        let pagina= this.state.pagina; //leer el state de la pagina actual 
        if(pagina>1){ //si la pagina es uno ya no ir hacia atras
          pagina-=1; //restar uno a la pagina actual
          this.setState({pagina}, //agregar el cambio al state
            ()=>{
              this.consultarApi();
              this.scroll();
            });
        }
        
      }

      paginaSiguiente = () => {
       
        console.log("paginaSiguiente");
        let pagina= this.state.pagina; //leer el state de la pagina actual 
        pagina++; //sumar uno a la pagina actual
        this.setState({pagina}, //agregar el cambio al state
          ()=>{this.consultarApi()
            this.scroll();
          });
      }
    
      consultarApi = ()=>{
        const pagina= this.state.pagina;
        const termino= this.state.termino;
        const url= `https://pixabay.com/api/?key=1680832-74d43234194527aae929c2be5&q=${termino}&per_page=30&page=${pagina}`;
        
        fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => this.setState({imagenes:resultado.hits}));
      }
    
      datosBusqueda = (termino) =>{
        this.setState({
          termino,
          pagina:1
        },()=>{
          this.consultarApi();
        })
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
                imagenes: data.results,
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
                imagenes: data.results,
                paginaActual: numeroPagina
              })
            }
          })
      }
    render(){
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

            <Grid className="fondo">
                <Grid.Column className="col-6 col-xs-6 col-sm-8 col-md-8 col-lg-8" >
                <div className="row justify-content-center">
                    <Resultado 
                    imagenes={this.state.imagenes} 
                    paginaAnterior={this.paginaAnterior}
                    paginaSiguiente={this.paginaSiguiente}
                    />
                </div>                   
                </Grid.Column>
            </Grid> 
          </>
        );
    }
}

export default SitoPelicula;