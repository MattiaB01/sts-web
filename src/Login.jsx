import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import M from 'materialize-css':
import Button from '@mui/material/Button';
import { CircularProgress, TextField, Typography } from '@mui/material';
import axios from 'axios';
//import './App.css';
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import logo from "./assets/STS_Logo.jpeg";

import proxy from "./proxy/proxy.jsx";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReg = () => {
    navigate("/registrati");

  }

  // Funzione per gestire il submit del form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impedisce il comportamento predefinito del form

    try {
      setLoading(true);
      // Invia una richiesta POST al server con i dati del login
      const response = await axios.post(`http://${proxy}:8080/login2`, {
        username,
        password


      });


      // Gestisci la risposta (ad esempio, salviamo un token di accesso)
      console.log(response.data);
      console.log(response.status);
      if (response.data === "trovato") {
        //const data = await response.json();
        //localStorage.setItem("authToken", response.data); // Salva il token
        localStorage.setItem("authToken", username);
        navigate("/home");
      } else {
        alert("Login fallito");
      }


      // Se la risposta è positiva, puoi reindirizzare l'utente o fare altre azioni
    } catch (err) {
      // Gestisci gli errori (ad esempio, username o password errati)
      alert("Si è verificato un errore");

      setError('Credenziali non valide.');
      console.error(err);
    }
    setLoading(false);
  };

 

  return (
    <>

      <div className="login-card" style={{ width: 300, margin: 'auto', padding: 10, borderRadius: 10 }} >
        <div style={{ color: "blueviolet" }}>
          <img src={logo} alt="Logo" width="230" height="230" style={{
            color: "black", borderRadius: "50%",

            boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",

            marginTop:20,
          }} />
        </div>
        {loading ? <Typography variant="h6"style={{ margin: 12 }}> <CircularProgress /> </Typography> :
          <Typography variant="h6" style={{ margin: 20 }}>
            Login
          </Typography>}

        {/* <h3  className="center-align" >Login</h3>*/}

        <form onSubmit={handleSubmit}>
          <div>
            <div className="input-field">
              <TextField id="username" label="Username" value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text" className="validate" required variant="standard" />

            </div>
            <TextField id="password" label="Password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password" className="validate" style={{ margin: 20 }} required variant="standard" />

            <div className="center-align">
              <Button type="submit" style={{ margin: 20 }} className="btn waves-effect waves-light" variant="contained" >  Login</Button>

            </div>

          </div>

        </form>

      </div>
      <Typography


        style={{ margin: 10, color: "white", cursor: "pointer" }}> <span onClick={handleReg}>Registrati</span> </Typography>

      <Typography


        style={{fontSize:12, margin: 10, color: "white", cursor: "pointer" }}> <span onClick={handleReg}>Recupera password</span> </Typography>
    </>

  )
}

export default Login;
