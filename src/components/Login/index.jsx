import React from 'react';
import './style.css';
import { Button } from '@material-ui/core';
import { auth, provider } from '../../firebase/firebase.js';

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="Login">
      <div className="Login__logo">
        <img
          src="https://www.logo.wine/a/logo/Discord_(software)/Discord_(software)-Logo.wine.svg"
          alt="discord-logo"
        />
      </div>
      <Button
        className="Login__Button"
        variant="contained"
        color="primary"
        onClick={signIn}
      >
        Sign In
      </Button>
    </div>
  );
}

export default Login;
