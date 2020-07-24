import React, {Component} from 'react';
import Buscador from './Buscador';
import BarraNavegacion from './BarraNavegacion';
import Lista from './Lista';
import Resultado from './Resultado'
import {Grid} from 'semantic-ui-react';
import './App.css'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  

class SitoPelicula extends Component{

    constructor(){
        super();
        this.state={
          termino:'',
          imagenes: [],
          pagina: ''
        }
    
      }
      
      scroll =()=>{
        const elemento= document.querySelector('.jumbotron');
        elemento.scrollIntoView({block: "start", behavior: "smooth"});
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



    
    render(){
        return (
            <>
            <BarraNavegacion/>
            <Buscador datosBusqueda={this.datosBusqueda}/>
            <Grid className="fondo">
                <Grid.Column className="grillaCarrito col-4 col-xs-4 col-sm-3 col-md-3 col-lg-3">
                    <Lista/>
                </Grid.Column>
                <Grid.Column className="grillaCatalogo col-6 col-xs-6 col-sm-8 col-md-8 col-lg-8" >
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