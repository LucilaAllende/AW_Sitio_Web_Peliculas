import React, {Component} from 'react';
import { Card, Button} from 'semantic-ui-react'

class Lista extends Component{

    render(){
        return (

            <Card className="cardCarrito">
                <div className="row justify-content-center">Listado de peliculas para ver</div>
                <Button>Quitar</Button>
            </Card>
            
        );
    }
}

export default Lista;