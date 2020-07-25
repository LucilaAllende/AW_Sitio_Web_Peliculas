import React from 'react';

const Imagen = (props) =>{
    console.log("props")
    console.log(props)
    console.log(props.imagen)
    
    return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div className="card">
            <div className="card-body">
                <div className="card-image waves-effect waves-block waves-light">
                    {
                    props.imagen == null ? <img src={`https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`} alt="card image" style={{width: "1004", height: 360}}/> : <img src={`http://image.tmdb.org/t/p/w185${props.imagen}`} alt="card image" style={{width: "1004", height: 360}}/>
                    }
                </div>
            </div>
        </div>
    </div>
    )
}

export default Imagen;