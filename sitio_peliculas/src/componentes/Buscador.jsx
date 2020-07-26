import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

class Buscador extends Component{

    useStyles = makeStyles((theme) => ({
        buscador:{
            marginTop: 45,
        }
      }));

    busquedaRef= React.createRef();
    obtenerDatos = (e)=>{
        e.preventDefault();
        const termino = this.busquedaRef.current.value;
        this.props.datosBusqueda(termino);
    }

    render(){
        return (
            <form onSubmit={this.props.handleSubmit} className="agregar-margen center">
                <div className="row pull-right">
                    <div className="form-group col-md-8">
                        <input id="inputBuscador" ref={this.busquedaRef} type="text" className="form-control form-control-lg" placeholder="Busca tu pelicula. Ejemplo: Godfather" onChange={this.props.handleChange}/>
                    </div>
                    <div className="form-group col-md-4">
                        <Button variant="contained" color="primary" type="submit">
                            Buscar
                        </Button>
                    </ div>  
                </div>
            </form>
        );
    }
}

export default Buscador;