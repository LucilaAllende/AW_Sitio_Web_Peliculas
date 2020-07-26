import React, {Component} from 'react';
import Pelicula from "./Pelicula";
import Paginacion from "./Paginacion";

class Resultado extends Component{

    mostrarImagenes=()=>{
        
        const peliculas= this.props.peliculas;
        if(peliculas.length===0){
            return null;
        } 
        //console.log("PELICULLLAAAAAS")
        //console.log(peliculas);



        return (
            <React.Fragment>
                <div className="col-s12 p-5 row">
                    {
                        peliculas.map((pelicula, i)=>(
                            <Pelicula
                            key={i}
                            imagen={pelicula.poster_path}
                            titulo={pelicula.title}
                            estreno={pelicula.release_date}
                            lenguaje={pelicula.original_language}
                            descripcion={pelicula.overview}
                            popularidad={pelicula.popularity}
                            puntuacion={pelicula.vote_average}
                            handleGuardarPelicula={() => this.props.handleGuardarPelicula(pelicula.id)}
                            />
                        ))
                    }
                </div>
                <Paginacion 
                paginaAnterior={this.props.paginaAnterior}
                paginaSiguiente={this.props.paginaSiguiente}
                />
            </React.Fragment>
        )

    }

    render(){
        return (
            <React.Fragment>{this.mostrarImagenes()}</React.Fragment>
            )
    }
}

export default Resultado;