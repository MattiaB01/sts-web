import { useState, useSyncExternalStore } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import M from 'materialize-css':
import Button from '@mui/material/Button';
import { TextField, Box, Typography } from '@mui/material';
import axios from 'axios';
//import './App.css';
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import logo from "./assets/STS_Logo.jpeg";

import proxy from "./proxy/proxy.jsx";
import CircularProgress from '@mui/material/CircularProgress';
function Recupera() {
  const navigate = useNavigate();
  // Funzione per gestire il submit del form

  const handleCodice = async (e) => {
    e.preventDefault(); // Impedisce il comportamento predefinito del form
    if (username != "") {
      setIsLoading(true)
      try {
        // Invia una richiesta POST al server con i dati del login
        //const responsew = await axios.post(`http://${proxy}:8080/email2&username=${username}`);
        const response = await // Send a POST request

          axios.post(`http://${proxy}:8080/email2`, null, {
            params: {
              username: username,
            }
          })
            .then(response => response.status)
            .catch(err => console.warn(err));
        setIsLoading(false)

        alert("Inserisci il codice ricevuto nella email.")

      }
      catch (e) {
        console.log(e

        )
      }
    }
    setIsLoading(false)
  }


  const handleSubmit = async (e) => {
    e.preventDefault(); // Impedisce il comportamento predefinito del form

    try {
      // Invia una richiesta POST al server con i dati del login
      const response= await axios.post(`http://${proxy}:8080/recovery2`, null, {
        params: {
          username: username,
          uuid:codice,
          newPw:password,
        }
      })
      //  .then(response => response.status)
      //  .catch(err => console.warn(err));
      // Gestisci la risposta (ad esempio, salviamo un token di accesso)
      console.log(response.data);
      console.log(response.status);
      if (response.data === "fatto") {
        //const data = await response.json();
        //localStorage.setItem("authToken", response.data); // Salva il token
        alert("Password modificata correttamente");
        navigate("/");
      } else {
        alert("Controlla il codice inserito.");
      }


      // Se la risposta è positiva, puoi reindirizzare l'utente o fare altre azioni
    } catch (err) {
      // Gestisci gli errori (ad esempio, username o password errati)
      alert("Si è verificato un errore");

      setError('Credenziali non valide.');
      console.error(err);
    }
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [codice, setCodice] = useState('');

  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    navigate('/');
  }

  return (
    <>

      <div className="login-card" style={{ width: 300, margin: 'auto', padding: 10, borderRadius: 10 }} >
        <div style={{ color: "blueviolet" }}>
          <img src={logo} alt="Logo" width="230" height="230" style={{
            color: "black", borderRadius: "50%",

            boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            marginTop: 20,

          }} />
        </div>
        <Typography variant="h6" style={{ margin: 5 }}>
          Recupera password

        </Typography>

        <form onSubmit={handleSubmit} >
          <div>
            <div style={{ width: 250, margin: "0 auto" }}>
              <TextField

                fullWidth
                id="username" label="Username" value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text" className="validate" required variant="standard" />
              <div className="center-align">
                {isLoading ?
                  <CircularProgress style={{ margin: 5 }} size={23} /> : <Button onClick={handleCodice} style={{ margin: 0 }} className="btn waves-effect waves-light" variant="text" >Ricevi il codice </Button>}

              </div>

              <TextField id="codice" label="Codice ricevuto per email" value={codice}
                fullWidth
                onChange={(e) => setCodice(e.target.value)}
                type="text" className="validate" variant="standard" />


              <TextField id="password" label="Nuova password" value={password}
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                type="text" className="validate" variant="standard" />


            </div>



            <div className="center-align">
              <Button type="submit" style={{ margin: 20 }} className="btn waves-effect waves-light" variant="contained" > Modifica </Button>

            </div>
          </div>
        </form>
      </div>

      <Typography


        style={{ margin: 10, color: "white", cursor: "pointer" }}><span onClick={handleLogin}>Login</span> </Typography>

    </>
  )
}

export default Recupera;