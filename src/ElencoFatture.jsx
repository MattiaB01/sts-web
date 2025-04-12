import React, { useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper, Typography, AppBar, Toolbar, Container, CircularProgress, LinearProgress } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from '@mui/material/Button';
import { useState } from "react";
import axios from "axios";
import proxy from "./proxy/proxy";


function ElencoFatture({ handleChange }) {
  const username = localStorage.getItem("authToken")
  const [elenco, setElenco] = useState([])

  const [daData, setDaData] = useState()
  const [aData, setAData] = useState()


  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    elencoFatture();
  }, [])


  useEffect(() => {
    console.log("elenco", elenco)
  }, [elenco])



  const elencoFatture = async () => {
    setIsLoading(true)
    const response = await axios.post(`http://${proxy}:8080/elencoFatture?username=${username}`)
    setElenco(response.data.fatture)
    console.log(response.data.fatture)
    setIsLoading(false)

  }

  const elencoFattureData = async () => {
    setIsLoading(true)
    const response = await axios.post(`http://${proxy}:8080/elencoFattureData?username=${username}&start=${daData}&end=${aData}`)
    setElenco(response.data.fatture)
    console.log(response.data.fatture)
    setIsLoading(false)

  }


  const handleEdit = (id) => {
    console.log(`Modifica utente con ID: ${id}`);
    handleChange("", 8, id);
  };

  const handleDelete = async (id) => {
    console.log(`Elimina utente con ID: ${id}`);
    const response = await axios.post(`http://${proxy}:8080/eliminaFattura?id=${id}`)
    elencoFatture();
  };

  return (
    <>
      <div style={{ display: "inline-block" }}>
        <div style={{ width: 250, height: 100, position: "relative", top: 100, left: 690 }}>
          <Container>
            <p> Filtra per data</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="Da"
                  format="DD-MM-YYYY"
                  onChange={

                    (newValue) => (

                      setDaData((new Date(newValue).toLocaleDateString()))

                    )}


                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="A"
                  format="DD-MM-YYYY"
                  onChange={
                    (newValue) => (

                      setAData((new Date(newValue).toLocaleDateString()))

                    )}
                />
              </DemoContainer>
            </LocalizationProvider>
            <Button onClick={() => elencoFattureData()} variant="contained" style={{ marginTop: 20 }}>Applica</Button>
          </Container>
        </div>
        <Container style={{
          background: "#f8f8f8", padding: 20, borderRadius: 6, marginTop: -120, marginLeft: -200, width: 840,

          boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
          boxShadow: " rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
        }}>
          <AppBar position="static" style={{ alignItems: 'center', marginBottom: 20 }}>
            <Toolbar variant="dense">
              <Typography variant="h6" color="inherit" component="div">
                ELENCO FATTURE
              </Typography>
            </Toolbar>
          </AppBar>

          <TableContainer component={Paper} style={{ width: 800, maxHeight: 430,minHeight:430 }}>

            <Table size="small" aria-label="a dense table">
              <TableHead>

                <TableRow>

                  <TableCell ><b>Numero</b></TableCell>
                  <TableCell><b>Data</b></TableCell>
                  <TableCell><b>Utente</b></TableCell>
                  <TableCell><b>Protocollo</b></TableCell>
                  <TableCell align="right"><b>Azioni</b></TableCell>
                </TableRow>

              </TableHead>

              <TableBody>
                {elenco.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.numFat}</TableCell>
                    <TableCell>{user.dataFat}</TableCell>
                    <TableCell>{user.cf}</TableCell>
                    <TableCell>{user.protocollo}</TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => handleEdit(user.id)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="default" onClick={() => handleDelete(user.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {isLoading && <LinearProgress />}
        </Container>
      </div>
    </>
  );
};

export default ElencoFatture;
