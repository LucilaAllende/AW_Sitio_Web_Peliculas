import React from 'react';
import Button from '@material-ui/core/Button';

const Imagen = (props) =>{
    return (
    <div className="col-md-5">
        <div className="card">
            <div className="card-body">
                <p><b><big>{props.titulo}</big></b></p>
                <p><b>Puntuación:</b> {props.puntuacion}</p>
                <p><b>Popularidad:</b> {props.popularidad}</p>
                <div className="card-image waves-effect waves-block waves-light">
                    {
                    props.imagen == null ? <img src={`https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`} alt="card image" style={{width: "90%", height: "100%"}}/> : <img src={`http://image.tmdb.org/t/p/w185${props.imagen}`} alt="card image" style={{width: "1004", height: 360}}/>
                    }
                </div>
                <p><b>Fecha de estreno:</b> {props.estreno}</p>
                <p><b>Lenguaje:</b> {props.lenguaje}</p>
                <p><b>Descripción:</b> {props.descripcion}</p>
                <Button variant="contained" color="primary" >
                    Agregar a favoritos
                </Button>
            </div>
        </div>
        <br/>
    </div>
    )
}

export default Imagen;