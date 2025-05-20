import React, { useEffect, useState } from "react";

import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

import { useNavigate } from "react-router-dom";


import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  AppBar, Toolbar, IconButton,
  Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,

} from "@mui/material";
import axios from 'axios';
import proxy from "./proxy/proxy";
import Grid from '@mui/material/Grid2';
import MenuIcon from '@mui/icons-material/Menu';

const DatiAccount = () => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  const navigate = useNavigate();
  const username = localStorage.getItem("authToken");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    pincode: "",
    piva: "",
  });

  useEffect(() => {
    recuperaProprietario();
  }, []);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.username) tempErrors.username = "Campo obbligatorio";
    if (!formData.password) tempErrors.password = "Campo obbligatorio";
    if (!formData.pincode) tempErrors.pincode = "Campo obbligatorio";
    if (!formData.piva) tempErrors.piva = "Campo obbligatorio";
    /*if (!/^[A-Z0-9]{16}$/.test(formData.codiceFiscale))
      tempErrors.codiceFiscale = "Codice Fiscale non valido";
    if (formData.password.length < 6)
      tempErrors.password = "La password deve avere almeno 6 caratteri";
    if (!/^\d{4,6}$/.test(formData.pincode))
      tempErrors.pincode = "PIN Code deve essere di 4-6 cifre";
    if (!/^\d{11}$/.test(formData.partitaIva))
      tempErrors.partitaIva = "Partita IVA deve essere di 11 cifre";*/

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const recuperaProprietario = async () => {
    setFormData({
      username: username,
    })
    /*
      try{
       const response = await axios.post(`http://${proxy}:8080/proprietario?username=${username}`
      );
      console.log(response.data);
      console.log(response.data.username);
      setFormData({
          username:response.data.username,
          password:response.data.password,
          pincode:response.data.pincode,
          piva:response.data.piva,
      })
      */

    /* }
      catch(e){
       console.log(`errore ${e}`);
      }*/
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    //const c = confirm("Eliminando l'account, verranno eliminati tutti i dati proprietario, utenti e fatture.\nConfermare per proseguire.")
    setOpen(false)
    if (true) {
      try {
        const response = await axios.post(`http://${proxy}:8080/deleteAccount?username=${username}`

        );
        localStorage.removeItem('authToken');
        navigate("/");
      }
      catch (e) { }
    }
  }

  const handleReset = (e) => {
    // e.preventDefault();
    setFormData([]);
  };

  return (
    <Container maxWidth="sm" style={{
      background: "#f8f8f8", padding: 20, borderRadius: 6, margin: -20,

      // boxShadow:'0px 10px 15px -3px rgba(0,0,0,0.1)',
      boxShadow: ' rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
    }}>
      <AppBar position="static" style={{ alignItems: 'center', marginBottom: 20 }}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" /*component="div"*/ component={'span'}>
            Il tuo account
          </Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {[
            { label: "Username", name: "username" },

            /*    { label: "PIN Code", name: "pincode", type: "number" },
                { label: "Partita IVA", name: "partitaIva", type: "number" },*/
          ].map((field) => (
            <Grid size={{ xs: 6, md: 20 }} key={field.name}>
              <TextField
                fullWidth
                disabled
                label={field.label}
                name={field.name}
                type={/*field.type ||*/ "text"}
                value={formData[field.name]}
                onChange={handleChange}
                error={!!errors[field.name]}
                helperText={errors[field.name]}
              />
            </Grid>
          ))}

          <Button style={{ margin: '0 auto' }}  /*onClick={handleSubmit}*/  onClick={handleClickOpen}> Elimina account</Button>
        </Grid>
      </form>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Elimina account"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Eliminando l'account, verranno eliminati tutti i dati proprietario, utenti e fatture. Confermare per proseguire
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annulla</Button>
          <Button onClick={handleSubmit} autoFocus>
            Conferma
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DatiAccount
