import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

const Paginacion = (props) => {
    const linksPaginas = []
    
    let varCantidadPaginas = 0
    //let varCantidadPaginasRestantes = 0

    if (props.paginas >= 20){
        varCantidadPaginas = 20
        //varCantidadPaginasRestantes = props.paginas + 1 - varCantidadPaginas
    }else{
        varCantidadPaginas = props.paginas + 1
    }
    const cantidadPaginas = varCantidadPaginas
    // Se crean los elementos de cada pagina.
    for( let i=1 ; i<=cantidadPaginas ; i++ ){
        let active = props.paginaActual === i ? 'active' : '';
        linksPaginas.push(<li 
                                className={`waves-effect elemento-lista-paginacion ${active}`} 
                                key={i} 
                                onClick={() => props.nextPage(i)}>
                                    <a className="btn mr-1" href="/#">{i}</a>
                            </li>)
    }

    const classes = useStyles();

    return(
        <> 
        <div className="container" >
            <div className="row">
                <ul className="pagination">
                    {props.paginaActual > 1 ? 
                        <li 
                            className="waves-effect elemento-lista-paginacion-prev" 
                            onClick={() => props.nextPage(props.paginaActual - 1)}>
                                <a className="btn" href="/#">Anterior</a>
                        </li> : ''
                    }
                    {linksPaginas}
                    {props.paginaActual < props.paginas + 1 ? 
                        <li 
                            className="waves-effect elemento-lista-paginacion-next" 
                            onClick={() => props.nextPage(props.paginaActual + 1)}>
                                <a className="btn" href="/#">Siguiente</a>
                        </li> : ''
                    }
                </ul>
            </div>
        </div>

        <div className={classes.root}>
            <Pagination count={10} />
        </div>
        </>
    )
}

export default Paginacion;