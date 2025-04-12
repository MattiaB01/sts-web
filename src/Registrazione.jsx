import { useState } from 'react'
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
function Registrazione() {
  const navigate = useNavigate();
  // Funzione per gestire il submit del form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impedisce il comportamento predefinito del form

    try {
      // Invia una richiesta POST al server con i dati del login
      const response = await axios.post(`http://${proxy}:8080/signup2`, {
        username,
        password,
        email


      });


      // Gestisci la risposta (ad esempio, salviamo un token di accesso)
      console.log(response.data);
      console.log(response.status);
      if (response.data != "errore") {
        //const data = await response.json();
        //localStorage.setItem("authToken", response.data); // Salva il token
        alert("Registrazione effettuata correttamente");
        navigate("/");
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
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [conferma, setConferma] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleLogin = ()=>{
    navigate('/');
  }

  return (
    <>

      <div className="login-card" style={{ width: 300, margin: 'auto' , padding:10 , borderRadius:10 }} >
        <div style={{ color: "blueviolet" }}>
          <img src={logo} alt="Logo" width="230" height="230" style={{
            color: "black", borderRadius: "50%",

            boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            marginTop:20,

          }} />
        </div>
        <Typography variant="h6" style={{ margin: 20 }}>
          Registrazione
        </Typography>

        <form onSubmit={handleSubmit} >
          <div>
            <Box style={{ margin: 20 }}>
              <TextField
                fullWidth

                id="username" label="Username" value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text" className="validate" required variant="standard" />

              <TextField id="password" label="Password" value={password}
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                type="text" className="validate" required variant="standard" />


              <TextField id="conferma" label="Password" value={conferma}
                fullWidth
                onChange={(e) => setConferma(e.target.value)}
                type="text" className="validate" required variant="standard" />

              <TextField id="email" label="Email per recupero password" value={email}
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                type="email" className="validate" required variant="standard" />
            </Box>



            <div className="center-align">
              <Button type="submit" style={{ margin: 20 }} className="btn waves-effect waves-light" variant="contained" >Registrati</Button>

            </div>
          </div>
        </form>
      </div>

      <Typography


        style={{ margin: 10, color: "white", cursor: "pointer" }}><span onClick={handleLogin}>Login</span> </Typography>

    </>
  )
}

export default Registrazione;
