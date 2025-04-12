import React, { useEffect , useState} from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper,Typography ,AppBar,Toolbar,Container} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import ModificaUtente from "./ModificaUtente";
import Home from "./Home";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import proxy from "./proxy/proxy";


/*const users = [
  { id: 1, nome: "Mario", cognome: "Rossi", codiceFiscale: "RSSMRA80A01H501Z" },
  { id: 2, nome: "Luca", cognome: "Bianchi", codiceFiscale: "BNCLCU85B02F205X" },
  { id: 3, nome: "Giulia", cognome: "Verdi", codiceFiscale: "VRDGLL90C03D704Y" },
  { id: 4, nome: "Sara", cognome: "Neri", codiceFiscale: "NRESRA95D04A001W" },
  { id: 1, nome: "Mario", cognome: "Rossi", codiceFiscale: "RSSMRA80A01H501Z" },
  { id: 2, nome: "Luca", cognome: "Bianchi", codiceFiscale: "BNCLCU85B02F205X" },
  { id: 3, nome: "Giulia", cognome: "Verdi", codiceFiscale: "VRDGLL90C03D704Y" },
  { id: 4, nome: "Sara", cognome: "Neri", codiceFiscale: "NRESRA95D04A001W" },
  { id: 1, nome: "Mario", cognome: "Rossi", codiceFiscale: "RSSMRA80A01H501Z" },
  { id: 2, nome: "Luca", cognome: "Bianchi", codiceFiscale: "BNCLCU85B02F205X" },
  { id: 3, nome: "Giulia", cognome: "Verdi", codiceFiscale: "VRDGLL90C03D704Y" },
  { id: 4, nome: "Sara", cognome: "Neri", codiceFiscale: "NRESRA95D04A001W" },
];*/




function ListaUtenti  ({handleChange}) {

  const [users,setUsers] = useState([]);

  //users[1]={nome:"Mattia",cognome:"Bonfanti",codiceFiscale:"BNFMTT81T10L388W"}
  
  const username = localStorage.getItem('authToken');

  const handleEdit = (id) => {
    console.log(`Modifica utente con ID: ${id}`);
    handleChange("",5,id);
  };

  const handleDelete = async(id) => {
    console.log(`Elimina utente con ID: ${id}`);
    const response = await axios.post(`http://${proxy}:8080/eliminaUtente?id=${id}`);
    alert(`Successo: Eliminazione effettuata correttamente`);
    lista();
  };

useEffect(()=>{
    lista();
    
  },[]);

  const lista = async () =>{
    const response = await axios.post(`http://${proxy}:8080/utenti?username=${username}`);
    console.log(response.data);
    const elenco = response.data;
    
    setUsers(elenco);
    //users.push(elenco);


  }

  return (
    <>
     <Container maxWidth="lg" style={{
      background: "#f8f8f8", padding: 20, borderRadius: 6,marginTop:-20,

      boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
      boxShadow: " rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
    }}>
    <AppBar position="static" style={{alignItems:'center',marginBottom:20}}>
        <Toolbar variant="dense">
          <Typography     variant="h6" color="inherit" component="div">
           ELENCO UTENTI
          </Typography>
        </Toolbar>
      </AppBar>
    <TableContainer component={Paper} style={{width:800,maxHeight:430}}>
      <Table  size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><b>Nome</b></TableCell>
            <TableCell><b>Cognome</b></TableCell>
            <TableCell><b>Codice Fiscale</b></TableCell>
            <TableCell align="right"><b>Azioni</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.nome}</TableCell>
              <TableCell>{user.cognome}</TableCell>
              <TableCell>{user.cf}</TableCell>
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
    </Container>
    </>
  );
};

export default ListaUtenti;
