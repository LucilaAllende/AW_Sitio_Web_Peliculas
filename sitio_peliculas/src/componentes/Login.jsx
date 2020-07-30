import React from "react";
import { Button } from "react-bootstrap";
import 'firebase/auth';
import { useUser } from 'reactfire';
import "./Login.css";
import { auth, provider } from '../firebase-config';

export default function Login(props) {
  const user = useUser();

  const logout = () => {
    auth.signOut().then(() => {
      props.handleEstadoUsuario(null)
    })
  }

  const login = () => {
    auth.signInWithPopup(provider).then((result) => {
      const usuario = result.user;
      props.handleEstadoUsuario(usuario)
    })
  }

  return (
    <div className="Login">

      {user ?
        <Button
          aria-controls="registrar-menu"
          aria-haspopup="true"
          onClick={logout}
          color="inherit">Cerrar Sesion</Button>
        :
        <Button
          aria-controls="registrar-menu"
          aria-haspopup="true"
          onClick={login}
          color="inherit">Iniciar Sesion</Button>
      }
    </div>
  );
}