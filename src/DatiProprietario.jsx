import React, { useEffect, useState } from "react";

import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  AppBar,Toolbar,IconButton
} from "@mui/material";
import axios from 'axios';
import proxy from "./proxy/proxy";
import Grid from '@mui/material/Grid2';
import MenuIcon from '@mui/icons-material/Menu';

const DatiProprietario = () => {

  const username= localStorage.getItem("authToken");
     
  const [formData, setFormData] = useState({
    codfisc: "",
    password: "",
    pincode: "",
    piva: "",
   });

   useEffect(()=>{
    recuperaProprietario();
  },[]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.codfisc) tempErrors.codfisc = "Campo obbligatorio";
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

  const recuperaProprietario = async () =>{
  
     try{
      const response = await axios.post(`${proxy}/proprietario?username=${username}`
     );
     console.log(response.data);
     console.log(response.data.username);
     setFormData({
         codfisc:response.data.username,
         password:response.data.password,
         pincode:response.data.pincode,
         piva:response.data.piva,
     })
     
    }
     catch(e){
      console.log(`errore ${e}`);
     }
  }

  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if (validate()) {

      console.log(username);
      console.log("Dati inviati:", formData);
      const response = await axios.post(`${proxy}/salvaProprietario`,{
        "user2":{
            "username":username,
        },
        "codiceFiscale":formData.codfisc,
        "password":formData.password,
        "pincode":formData.pincode,
        "piva":formData.piva,
       });

     // alert(`Registrazione completata con successo! ${formData.codfisc}-${formData.password}-${formData.pincode}-${formData.piva}`);
    }
  };

  const handleReset = (e) => {
   // e.preventDefault();
    setFormData([]);
  };

  return (
    <Container maxWidth="sm" style={{background:"#f8f8f8", padding:20, borderRadius:6,margin:-20,

     // boxShadow:'0px 10px 15px -3px rgba(0,0,0,0.1)',
      boxShadow:' rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
    }}> 
      <AppBar position="static" style={{alignItems:'center',marginBottom:20}}>
        <Toolbar variant="dense">
          <Typography     variant="h6" color="inherit" /*component="div"*/ component={'span'}>
            I TUOI DATI INVIO
          </Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {[
            { label: "Codice Fiscale", name: "codfisc" },
            { label: "Password", name: "password" },
            { label: "Pincode", name: "pincode" },
            { label: "Partita Iva", name: "piva"},
        /*    { label: "PIN Code", name: "pincode", type: "number" },
            { label: "Partita IVA", name: "partitaIva", type: "number" },*/
          ].map((field) => (
            <Grid size={{ xs: 6, md: 6 }}  key={field.name}>
              <TextField
                fullWidth
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

         
        </Grid>
        <Grid item xs={12} >
            <Button style={{margin:30}}  type="submit"  variant="contained" color="primary"> 
              Salva
            </Button>
            <Button style={{margin:10}} type="reset" onClick={handleReset} variant="contained" color="primary"> 
              Cancella
            </Button>
          </Grid>
      </form>
    </Container>
  );
};

export default DatiProprietario;
