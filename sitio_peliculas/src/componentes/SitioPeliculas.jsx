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
          imagenes: [],
          peliculas: [],
          pagina: '',
          sidebarOpen: false,
          totalResultados: 0,
          paginaActual: 1,
          listaPeliculas: []
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

      handleGuardarProducto(productId) {
    
        //busco el producto en mi lista de productos
        let producto = this.state.products.find(elemProducto => elemProducto.id === productId);
        let indexProducto = this.state.products.findIndex(x => x.id === producto.id)
    
        var productoCarrrito = {
          id: producto.id,
          nombre: producto.nombre,
          img: producto.imagen,
          precio: producto.precio,
          cantidad: 1,
          total: producto.precio
        }
        //verifico si el producto esta o no en el carrito
        var existe = this.state.carrito.find(elemProducto => elemProducto.id === productId)
        if (undefined !== existe && existe !== null) {
          let indexCarrito = this.state.carrito.findIndex(x => x.id === existe.id)
          this.handlerAgregarProducto(indexCarrito, indexProducto)    
        }else{
          var copiaState = Object.assign({}, this.state);
          copiaState.products[indexProducto].stock -= 1
          copiaState.total += 1
          this.setState({total: copiaState.total})
          copiaState.sum += copiaState.products[indexProducto].precio
          this.setState({sum: copiaState.sum})
          this.setState({
            carrito: this.state.carrito.concat([productoCarrrito]),
            copiaState
          })
        }
    
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
            <Grid>
                <Grid.Column className="col-12 fondo" >
                <div className="row justify-content-center resultado">
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