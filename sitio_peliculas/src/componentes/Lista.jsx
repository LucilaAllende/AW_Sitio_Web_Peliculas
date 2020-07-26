import React, {Component} from 'react';
import { Card, Button} from 'semantic-ui-react'

class Lista extends Component{

    render(){
        return (

            <Card className="cardCarrito">
                <div className="row justify-content-center">Listado de peliculas para ver</div>
                <p> {this.props.lista} </p>
                <Button>Quitar</Button>
            </Card>
            
        );
    }
}

export default Lista;