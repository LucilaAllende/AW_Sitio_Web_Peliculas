import React from 'react';
import Button from '@material-ui/core/Button';
import {useUser} from 'reactfire';

const Pelicula = (props) =>{
    const user = useUser();

    return (
    <div className="col-md-4 col-sm-9 col-xs-9 col-md-6 col-lg-4 ">
        <div className="card">
            <div className="card-body">
                <p><b><big>{props.titulo}</big></b></p>
                <p><b>Puntuación:</b> {props.puntuacion}</p>
                <p><b>Popularidad:</b> {props.popularidad}</p>
                <div className="card-image waves-effect waves-block waves-light">
                    {
                    props.imagen == null ? <img src={`https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`} alt="Photos" style={{width: "90%", height: "100%"}}/> : <img src={`http://image.tmdb.org/t/p/w185${props.imagen}`} alt="Photos" style={{width: "1004", height: 360}}/>
                    }
                </div>
                <p><b>Fecha de estreno:</b> {props.estreno}</p>
                <p><b>Lenguaje:</b> {props.lenguaje}</p>
                <p><b>Descripción:</b> {props.descripcion}</p>
                { user &&
                <Button variant="contained" color="primary" onClick={props.handleGuardarPelicula}>
                    Agregar a Mi Lista
                </Button>}
            </div>
        </div>
        <br/>
    </div>
    )
}

export default Pelicula;