import React, {Component} from 'react';
import Imagen from "./Imagen";
import Paginacion from "./Paginacion";

class Resultado extends Component{

    mostrarImagenes=()=>{
        
        const imagenes= this.props.imagenes;
        if(imagenes.length===0){
            return null;
        } 
        
        return (
            <React.Fragment>
                <div className="col-s12 p-5 row">
                    {
                        imagenes.map((imagen, i)=>(
                            <Imagen
                            key={i}
                            imagen={imagen.poster_path}
                            titulo={imagen.title}
                            estreno={imagen.release_date}
                            lenguaje={imagen.original_language}
                            descripcion={imagen.overview}
                            popularidad={imagen.popularity}
                            puntuacion={imagen.vote_average}
                            />
                        ))
                    }
                </div>
                {this.props.totalResultados > 20 ? <Paginacion nextPage={this.props.nextPage} paginas={this.props.numeroPaginas} paginaSiguiente={this.props.paginaSiguiente} paginaActual={this.props.paginaActual}/>: ''}
                
                
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