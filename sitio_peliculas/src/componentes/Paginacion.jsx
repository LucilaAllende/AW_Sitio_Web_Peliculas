import React from 'react';
import Button from '@material-ui/core/Button';

const Paginacion = (props) => {
    const linksPaginas = []
    
    for( let i=1 ; i<=props.paginas +1 ; i++ ){
        let active = props.paginaActual == i ? 'active' : '';

    linksPaginas.push(<li className={`waves-effect elemento-lista-paginacion ${active}`} key={i} onClick={() => props.nextPage(i)}><a href="#">{i}</a></li>)
    }

    return(
        <div className="container" >
            <div className="row">
                <ul className="pagination">
                    {props.paginaActual > 1 ? <li className="waves-effect elemento-lista-paginacion-prev"   onClick={() => props.nextPage(props.paginaActual - 1)}><a href="#">Prev</a></li> : ''}
                        {linksPaginas}
                    {props.paginaActual < props.paginas + 1 ? <li className="waves-effect elemento-lista-paginacion-next" onClick={() => props.nextPage(props.paginaActual + 1)}><a href="#">Next</a></li> : ''}
                </ul>
            </div>
        </div>
    )
}

export default Paginacion;