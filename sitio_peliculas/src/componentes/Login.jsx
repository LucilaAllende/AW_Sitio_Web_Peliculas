import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import 'firebase/auth';
import {useFirebaseApp, useUser} from 'reactfire';
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firebase = useFirebaseApp();
  const user = useUser();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  const submit = async () => {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  const logout = async () => {
    await firebase.auth().signOut();
  }

  const login = async () => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  }

  return (
    <div className="Login">
      
      {
        !user &&
        <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit" onClick={submit}>
          Crear cuenta
        </Button>
        <Button block bsSize="large" disabled={!validateForm()} type="submit" onClick={login}>
          Login
        </Button>
      </form>
      }
      {
        user && 
        <Button 
        aria-controls="registrar-menu" 
        aria-haspopup="true" 
        onClick={logout}
        color="inherit">Cerrar Sesion</Button>
      }
    </div>
  );
}