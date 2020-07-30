import React, { Component } from 'react';
import Buscador from './Buscador';
import BarraNavegacion from './BarraNavegacion';
import Resultado from './Resultado'
import { Grid, Card } from 'semantic-ui-react';
import './App.css'
import 'react-pro-sidebar/dist/css/styles.css';
import Sidebar from "react-sidebar";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import firebase, { auth } from '../firebase-config';
class SitioPeliculas extends Component {

  constructor() {
    super();
    this.state = {
      termino: '',
      peliculas: [],
      pagina: '',
      sidebarOpen: false,
      totalResultados: 0,
      paginaActual: 1,
      listaPeliculas: [],
      usuario: null,
    }
    this.apiKey = process.env.REACT_APP_API
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGuardarPelicula = this.handleGuardarPelicula.bind(this);
    this.handleEstadoUsuario = this.handleEstadoUsuario.bind(this);

  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.inputBuscador.value) {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=f4ebf0475efbb7e569cbca44092c1d11&query=${this.state.termino}`)
        .then(data => data.json())
        .then(data => {
          if (data) {
            this.setState({
              peliculas: [...data.results],
              totalResultados: data.total_results
            })
          }
        })

    }
  }

  handleChange = (e) => {
    this.setState({ termino: e.target.value })
  }

  nextPage = (numeroPagina) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=f4ebf0475efbb7e569cbca44092c1d11&query=${this.state.termino}&page=${numeroPagina}`)
      .then(data => data.json())
      .then(data => {
        if (data) {
          this.setState({
            peliculas: [...data.results],
            paginaActual: numeroPagina
          })
        }
      })
  }

  handleGuardarPelicula(peliculaId) {
    //busco el pelicula en mi lista de productos
    let pelicula = this.state.peliculas.find(elemPelicula => elemPelicula.id === peliculaId);
    var peliculaVer = {
      idApi: pelicula.id,
      nombre: pelicula.title,
      imagen: pelicula.poster_path
    }

    //verifico si el pelicula esta o no en el listaPeliculas
    var existe = this.state.listaPeliculas.find(elemPelicula => elemPelicula.idApi === peliculaId)
    if (existe !== undefined && existe !== null) {
      alert("This movie has already been added to the list.")
    } else {

      const usuariosRef = firebase.database().ref(`/usuarios/${this.state.usuario.uid}`);
      usuariosRef.push(peliculaVer);
    }

    return this.state.listaPeliculas
  }

  handleQuitarPelicula(peliculaId, uid) {
    const itemRef = firebase.database().ref(`/usuarios/${uid}/${peliculaId}`);
    itemRef.remove();
  }

  handleEstadoUsuario(algo) {
    this.setState({
      usuario: algo
    });
    window.location.reload(false);
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ usuario: user });
      }
    });

    const usuariosRef = firebase.database().ref('usuarios');
    usuariosRef.on('value', (snapshot) => {
      let usuarios = snapshot.val();

      for (let usuario in usuarios) {
        if (usuario === firebase.auth().currentUser.uid) {
          const usuariosRef2 = firebase.database().ref('usuarios').child(usuario);
          usuariosRef2.on('value', (snapshot) => {
            let peliculas = snapshot.val();
            let newState = [];
            for (let pelicula in peliculas) {
              newState.push({
                id: pelicula,
                idApi: peliculas[pelicula].idApi,
                nombre: peliculas[pelicula].nombre,
                imagen: peliculas[pelicula].imagen
              });
            }
            this.setState({
              listaPeliculas: newState
            });
          });
          this.forceUpdate();
        }
      }
    });
  }

  crearElementoListaSidebar(listaPeliculas) {
    let paqueteHTML = []
    // Se agrega el titulo a la lista de favoritos.
    if (paqueteHTML.length === 0) {
      paqueteHTML.push(
        <>
          <div className="titulo-lista-fav" >
            <h4>Movies</h4>
          </div>
        </>
      )
    }
    // Se agrega una pelicula a la lista de favoritos.
    if (listaPeliculas.length !== 0) {
      for (let i = 0; i < listaPeliculas.length; i++) {
        paqueteHTML.push(
          <Card className="card-pelicula">
            <Card.Content>
              <Card.Header style={{ fontSize: 18 }}>
                <p>{listaPeliculas[i].nombre}  </p>
              </Card.Header>
              <img src={`http://image.tmdb.org/t/p/w185${listaPeliculas[i].imagen}`} style={{ width: "50%", height: "50%" }} alt="Photos" />
            </Card.Content>
            <Card.Content>
              <IconButton color="primary" aria-label="delete" className="btn-eliminar-lista-fav" onClick={() => this.handleQuitarPelicula(listaPeliculas[i].id, this.state.usuario.uid)}>
                <DeleteIcon color="inherit" />
              </IconButton>
            </Card.Content>
          </Card>
        )
      }
    }
    else {
      paqueteHTML.push(
        <Card>
          <Card.Content>
            You haven't added movies yet.
        </Card.Content>
        </Card>
      )
    }
    return paqueteHTML
  }



  render() {
    const numeroPaginas = Math.floor(this.state.totalResultados / 20)
    let listaSidebar = this.crearElementoListaSidebar(this.state.listaPeliculas)
    return (
      <>
        <Sidebar
          sidebar={<b>{listaSidebar}</b>}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white", height: "100%" } }}
        >
        </Sidebar>
        <BarraNavegacion handleEstadoUsuario={this.handleEstadoUsuario} onSetSidebarOpen={this.onSetSidebarOpen} />
        <Buscador handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
        <Grid>
          <Grid.Column className="col-12 fondo" >
            <div className="row justify-content-center resultado">
              <Resultado
                peliculas={this.state.peliculas}
                totalResultados={this.state.totalResultados}
                paginaActual={this.state.paginaActual}
                numeroPaginas={numeroPaginas}
                nextPage={this.nextPage}
                handleGuardarPelicula={this.handleGuardarPelicula}
              />
            </div>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

export default SitioPeliculas;