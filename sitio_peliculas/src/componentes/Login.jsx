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
    <div>
      {user ?
        <Button
          className="btn-auth"
          aria-haspopup="true"
          align="right"
          onClick={logout}
          color="inherit">
          Log out
          </Button>
        :
        <Button
          className="btn-auth"
          aria-haspopup="true"
          onClick={login}
          color="inherit">Log in</Button>
      }
    </div>
  );
}