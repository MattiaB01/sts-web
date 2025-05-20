import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import M from 'materialize-css':
import Button from '@mui/material/Button';
import {
  TextField, Box, Typography, Checkbox,
  Dialog, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import axios from 'axios';
//import './App.css';
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import logo from "./assets/STS_Logo.jpeg";

import proxy from "./proxy/proxy.jsx";
function Registrazione() {

  const [mex, setMex] = useState("Registrazione effettuata correttamante.")

  const [open2, setOpen2] = useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };


  const navigate = useNavigate();

  const [errors, setErrors] = useState({})
  const [error, setError] = useState()

  const validate = () => {
    let tempErrors = {};
    if (password != conferma) {

      tempErrors.password = "Le password non coincidono";
      setErrors(tempErrors);
      return false;
    }

    else {
      tempErrors.password = '';
      /*if (!/^[A-Z0-9]{16}$/.test(formData.codiceFiscale))
        tempErrors.codiceFiscale = "Codice Fiscale non valido";
      if (formData.password.length < 6)
        tempErrors.password = "La password deve avere almeno 6 caratteri";
      if (!/^\d{4,6}$/.test(formData.pincode))
        tempErrors.pincode = "PIN Code deve essere di 4-6 cifre";
      if (!/^\d{11}$/.test(formData.partitaIva))
        tempErrors.partitaIva = "Partita IVA deve essere di 11 cifre";*/
      console.log("in validate - errore" + tempErrors.password)
      console.log(password)
      console.log(conferma)
      setErrors(tempErrors);
      console.log(errors.password)
      //return Object.keys(tempErrors).length === 0;
      return true;
    }
  };



  // Funzione per gestire il submit del form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impedisce il comportamento predefinito del form
    if (validate()) {

      try {
        // Invia una richiesta POST al server con i dati del login
        const response = await axios.post(`http://${proxy}:8080/signup2`, {
          username,
          password,
          email


        });


        // Gestisci la risposta (ad esempio, salviamo un token di accesso)
        console.log("risposta:" + response.data);
        console.log(response.status);
        if (response.data != "errore") {
          //const data = await response.json();
          //localStorage.setItem("authToken", response.data); // Salva il token


          // alert("Registrazione effettuata correttamente");
          setOpen2(true)
          setMex("Registrazione effettuata correttamente.")
          setTimeout(() => {
            navigate("/");
          }, 3000);

         
        } else {
          //("Username esistente");
          setOpen2(true)
          setMex("Username esistente.")
        }


        // Se la risposta è positiva, puoi reindirizzare l'utente o fare altre azioni
      } catch (err) {
        // Gestisci gli errori (ad esempio, username o password errati)
        alert("Si è verificato un errore");

        setError('Credenziali non valide.');
        console.error('errore in response ' + err);
      }
    }

  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [conferma, setConferma] = useState('');
  const [email, setEmail] = useState('');


  const handleLogin = () => {
    navigate('/');
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="p" component="h2">
              Termini di servizio

            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ fontSize: 10 }}>
              Questa applicazione è fornita gratuitamente per facilitare l'invio dei dati delle fatture sanitarie tramite API al Sistema Tessera Sanitaria dell'Agenzia delle Entrate. <br />

              L’utilizzo dell’app avviene sotto la piena responsabilità dell’utente finale. {/* L'autore non garantisce che l’applicazione sia priva di errori o che soddisfi pienamente gli obblighi di legge in merito all'invio dei dati fiscali. */}
              L’autore declina ogni responsabilità per malfunzionamenti, errori nei dati trasmessi o danni derivanti dall’utilizzo del software.
              <br /><br />
              <b>Trattamento dei Dati personali {/*GDPR*/}</b>
              <br />
              I dati inseriti (anagrafici e fiscali) vengono memorizzati in un database locale {/*ospitato su un Raspberry Pi,*/} gestito direttamente dall’applicazione. Nessun dato viene trasmesso a terzi.

              L’utente ha la possibilità di cancellare {/*singolarmente*/} i propri dati tramite l’interfaccia dell’applicazione.
              {/* A breve sarà disponibile una funzione per esportare tutti i propri dati personali in formato leggibile.*/}

              {/*Nonostante siano adottate misure tecniche basilari per la protezione dei dati, l’autore non può garantire la totale sicurezza né la piena conformità con la normativa GDPR. Pertanto */}
              Non si assume responsabilità in caso di violazione, accesso non autorizzato o perdita di dati.

              L’utente è tenuto a utilizzare l’applicazione in modo consapevole e a non inserirvi dati per i quali non abbia i diritti o le autorizzazioni necessarie.
            </Typography>
          </Box>
        </Modal>
      </div>



      <div className="login-card" style={{ width: 300, margin: 'auto', marginTop: -15, padding: 10, borderRadius: 10 }} >
        <div style={{ color: "blueviolet" }}>
          <img src={logo} alt="Logo" width="230" height="230" style={{
            color: "black", borderRadius: "50%",

            boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            marginTop: 20,

          }} />
        </div>
        <Typography variant="h6" style={{ margin: 10 }}>
          Registrazione
        </Typography>

        <form onSubmit={handleSubmit} >
          <div>
            <Box style={{ margin: 10 }}>
              <TextField
                fullWidth
                id="username" label="Username" value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text" className="validate" required variant="standard" />

              <TextField id="password" label="Password" value={password}
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                type="password" className="validate" required variant="standard" />


              <TextField id="conferma" label="Conferma password" value={conferma}
                fullWidth
                error={!!errors.password}
                helperText={errors.password}
                onChange={(e) => setConferma(e.target.value)}
                type="text" className="validate" required variant="standard" />


              <TextField id="email" label="Email recupero password" value={email}
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                type="email" className="validate" required variant="standard" />
            </Box>


            <Checkbox required />  <Button style={{ fontSize: 10, marginLeft: -10 }} onClick={handleOpen}>Accetta termini di servizio</Button>
            <div className="center-align">
              <Button type="submit" style={{ margin: 5 }} className="btn waves-effect waves-light" variant="contained" >Registrati</Button>

            </div>
          </div>
        </form>
      </div>

      <Typography


        style={{ margin: 10, color: "white", cursor: "pointer" }}><span onClick={handleLogin}>Login</span> </Typography>


      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Registrazione"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {mex}
          </DialogContentText>
        </DialogContent>

      </Dialog>
    </>
  )
}

export default Registrazione;
