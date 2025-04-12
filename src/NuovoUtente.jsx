import React, { useState } from "react";
import axios from 'axios';
import proxy from "./proxy/proxy";
import {
  TextField,
  Button,
  Container,
  Grid2,
  Typography,
  Box,
  AppBar, Toolbar, IconButton
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const NuovoUtente = () => {

  const username= localStorage.getItem("authToken"); 

  const handleReset =() =>{
    setFormData({
      nome: "",
      cognome: "",
      codiceFiscale: "",
      indirizzo: "",
      cap: "",
      città: "",
      tel: "",
      email: "",
      provincia:"",
      
    })
  }

  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    codiceFiscale: "",
    indirizzo: "",
    cap: "",
    città: "",
    tel: "",
    email: "",
    provincia:"",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.nome) tempErrors.nome = "Campo obbligatorio";
    if (!formData.cognome) tempErrors.cognome = "Campo obbligatorio";
  /*  if (!/^[A-Z0-9]{16}$/.test(formData.codiceFiscale))
      tempErrors.codiceFiscale = "Codice Fiscale non valido.";*/
   /* if (formData.password.length < 6)
      tempErrors.password = "La password deve avere almeno 6 caratteri";
    if (!/^\d{4,6}$/.test(formData.pincode))
      tempErrors.pincode = "PIN Code deve essere di 4-6 cifre";
    if (!/^\d{11}$/.test(formData.partitaIva))
      tempErrors.partitaIva = "Partita IVA deve essere di 11 cifre";*/

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Dati inviati:", formData);

      const response = await axios.post(`http://${proxy}:8080/salvaUtente`,{
          "username":username,
          "nome":formData.nome,
          "cognome":formData.cognome,
          "cf":formData.codiceFiscale,
          "cap":formData.cap,
          "città":formData.città,
          "provincia":formData.provincia,
          "indirizzo":formData.indirizzo,
          "telefono":formData.tel,
          "email":formData.email,
       });

      alert(`Successo: ${formData.nome}-${formData.cognome}-${formData.codiceFiscale}-${formData.città}\n${formData.cap}-${formData.indirizzo}-${formData.tel}-${formData.email}-${formData.provincia}`);
    }
  };

  return (
    <Container maxWidth="sm" style={{
      background: "#f8f8f8", padding: 20, borderRadius: 6,marginTop:-20,

      boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
      boxShadow: " rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
    }}>
      <AppBar position="static" style={{ alignItems: 'center', marginBottom: 20 }}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component={'span'}>
            NUOVO UTENTE
          </Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <Grid2 container spacing={2}>
          {[
            { label: "Nome", name: "nome" },
            { label: "Cognome", name: "cognome" },
            { label: "Codice Fiscale", name: "codiceFiscale" },
            { label: "Indirizzo", name: "indirizzo" },
            { label: "Cap", name: "cap" },
            { label: "Città", name: "città", },
            { label: "Provincia", name: "provincia", },
            { label: "Telefono", name: "tel", },
            /* { label: "Email", name: "email", },*/
          ].map((field) => (
            <Grid2 size={{ xs: 6, md: 6 }} sm={field.name === "cap" ? 2 : 8} key={field.name}>
              <TextField
                fullWidth
                inputProps={field.name==="codiceFiscale" ? {maxLength:16}: {maxLength:50}}        
                label={field.label}
                name={field.name}
                type={field.type || "text"}
                value={formData[field.name]}
                onChange={handleChange}
                error={!!errors[field.name]}
                helperText={errors[field.name]}
              />
            </Grid2>
          ))}
          <TextField
            fullWidth
            label={"email"}
            name={"email"}
            type={"text"}
            value={formData.email}
            onChange={handleChange}
          //   error={!!errors[email]}
          //  helperText={errors[email]}
          />

        </Grid2>
        <Grid2 item xs={12} >
          <Button style={{ margin: 30 }} type="submit" variant="contained" color="success">
            Salva
          </Button>
          <Button style={{ margin: 10 }} type="reset" variant="contained" color="primary">
            Cancella
          </Button>
        </Grid2>
      </form>
    </Container>
  );
};

export default NuovoUtente;
