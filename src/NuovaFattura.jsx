import React, { useEffect, useState } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import EuroIcon from '@mui/icons-material/Euro';

import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import {
  CircularProgress,
  LinearProgress,
  Autocomplete,
  TextField,
  Button,
  Container,
  Grid2,
  Typography,
  Box,
  AppBar, Toolbar, IconButton,
  FormControlLabel,
  NativeSelect,
  Checkbox,

} from "@mui/material";

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import MenuIcon from '@mui/icons-material/Menu';

import axios from "axios";
import proxy from "./proxy/proxy";

import { getProprietario, getUtente } from "./api/api";

import dayjs from 'dayjs';

const NuovaFattura = () => {

  const [isLoading, setIsLoading] = useState(false)

  const [esito, setEsito] = useState()

  const [aggiungi, setAggiungi] = useState(false);

  const [natIva2, setNatIva2] = useState()

  const [bollo, setBollo] = useState()

  const username = localStorage.getItem('authToken');

  const [invio, setInvio] = useState(

    {
      proprietario: {
        username: "",
        password: "",
        pincode: "",
        piva: ""
      },
      fattura: {
        proprietario: "",
        utente: "",
        dataFat: "",
        dataPag: "",
        numFat: "",
        impTot1: "",
        natIva1: "N2.2",
        aggiungi: false,
        bollo: "",
        natIva2: "N2.2",
        numDisp: 1,
        tracciato: "SI",
        opposizione: "NO",
        anticipato: "NO",
        fatPag: "NO",
        tipoSpesa: "SP",
        tipoDoc: "Fattura",
        username: username,
        pagata: "",

      }

    }



  );






  const [data, setData] = useState([]);

  const [formData, setFormData] = useState([]);

  const [users, setUsers] = useState([]);

  const [pagata, setPagata] = useState(false)

  useEffect(() => {

    ottieniProprietario();

    axios.post(`http://${proxy}:8080/utenti?username=${username}`)
      .then(response => {
        setData(response.data)
        console.log("fatto")
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);


  const invia = async () => {
    setEsito("")
    setIsLoading(true)
    if (aggiungi === false) {
      setInvio(
        prev => (
          {
            ...prev,
            proprietario: {
              ...prev.proprietario
            },
            fattura: {
              ...prev.fattura,
              natIva2: "",
              bollo: "",
            }
          }
        )
      )
    }
    try {
      const response = await axios.post(`http://${proxy}:8080/invioFattura`, invio);
      setEsito(response.data)
    }
    catch {

    }
    //alert('Operazione effettuata correttamente')
    setIsLoading(false)




  }


  const salvaFattura = async () => {
    setEsito("")
    setIsLoading(true)
    if (aggiungi === false) {
      setInvio(
        prev => (
          {
            ...prev,
            proprietario: {
              ...prev.proprietario
            },
            fattura: {
              ...prev.fattura,
              natIva2: "",
              bollo: "",
            }
          }
        )
      )
    }
    try {
      const response = await axios.post(`http://${proxy}:8080/salvaFattura`, invio);
      if(response.data==="ok")
       {setEsito("Fattura salvata")}
      else 
      {setEsito("Errore. Controlla i dati inseriti")}
    }
    catch {

    }
    //alert('Operazione effettuata correttamente')
    setIsLoading(false)




  }



  const listaUtenti = async () => {




    const response = await axios.post(`http://${proxy}:8080/utenti?username=${username}`);

    setUsers(response.data)
    users.map((user) => {
      console.log("aa", user.nome);
    });
    /*const elenco = response.data;
    setUsers(elenco);
    console.log("Elenco",elenco)      */

    //users.push(elenco);

  }


  const [doc, setDoc] = React.useState('');

  const handleDocumento = (event) => {
    setDoc(event.target.value);
  };


  const [utente, setUtente] = React.useState('');

  const [nIva, setNIva] = React.useState('');
  const [nIva2, setNIva2] = React.useState('');

  const handleUtente = (event) => {
    setUtente(event.target.value);
    console.log(event.target.value);

    setInvio(prevState => ({
      ...prevState,
      fattura: {
        ...prevState.fattura,
        utente: event.target.value
      }
    }))




  };


  const handleIva = (event) => {
    setNIva(event.target.value);
  };

  const handleIva2 = (event) => {
    setNIva2(event.target.value);
  };


  const [utenti, setUtenti] = useState([]);

  const [errors, setErrors] = useState({});




  const handleAggiungi = () => {
    setAggiungi(!aggiungi);

    setInvio(prev => ({
      ...prev,
      invio: {
        ...prev.invio
      },
      fattura: {
        ...prev.fattura,
        aggiungi: aggiungi ? false : true,
        // natIva2: !aggiungi ? natIva2 : "",
        // bollo: !aggiungi ? bollo : "",

      }
    })

    )
  }

  const handleChange = (e) => {



    setInvio(prevState => ({
      ...prevState,
      proprietario: {
        ...prevState.proprietario
      },
      fattura: {
        ...prevState.fattura,
        [e.target.name]: e.target.value,

      }


    })
    )



    console.log("a", e.target.name)
  };

  /*
  
    const validate = () => {
        let tempErrors = {};
      
    
        /*    if (!formData.nome) tempErrors.nome = "Campo obbligatorio";
        if (!formData.cognome) tempErrors.cognome = "Campo obbligatorio";
        if (!/^[A-Z0-9]{16}$/.test(formData.codiceFiscale))
          tempErrors.codiceFiscale = "Codice Fiscale non valido";
        if (formData.password.length < 6)
          tempErrors.password = "La password deve avere almeno 6 caratteri";
        if (!/^\d{4,6}$/.test(formData.pincode))
          tempErrors.pincode = "PIN Code deve essere di 4-6 cifre";
        if (!/^\d{11}$/.test(formData.partitaIva))
          tempErrors.partitaIva = "Partita IVA deve essere di 11 cifre";*/
  /*
      setErrors(tempErrors);
      return Object.keys(tempErrors).length === 0;
          };*/


  useEffect(() => {
    console.log("Invio aggiornato:", invio);
    console.log(invio.proprietario.username)
  }, [invio]);

  const ottieniProprietario = async (e) => {
    console.log("invio", invio)

    const risultato = await getProprietario();
    console.log("risultato", risultato)

    console.log("username", risultato.codiceFiscale)

    setInvio(prevState => ({
      ...prevState,
      proprietario: {
        username: risultato.data.username,
        pincode: risultato.data.pincode,
        password: risultato.data.password,
        piva: risultato.data.piva,
      },
      fattura: {
        ...prevState.fattura,
        proprietario: risultato.data.username,
      }
    }));



  }


  const handleSubmit = async () => {

    setInvio(prevState => ({
      ...prevState,
      proprietario: {
        ...prevState.proprietario,
      },
      fattura: {
        ...prevState.fattura,
        dataFat: dataFat,

      }
    })
    )

    /*
        //e.preventDefault();
        if (validate()) {
          console.log("Dati inviati:", formData);
          alert("Registrazione completata con successo!");
        }*/
  };

  const [dataPag, setDataPag] = useState();

  const handleDataPag = (e) => {
    setDataPag(e.target)
    console.log(e.target.name)
  }


  const [dataFat, setDataFat] = useState();

  const handleDataFat = (e) => {
    setDataPag(e.target)
    console.log(e.target.name)
  }

  const handlePagata = (e) => {
    setPagata(!pagata)
    setInvio(prev => ({
      ...prev,
      invio: {
        ...prev.invio
      },
      fattura: {
        ...prev.fattura,
        fatPag: pagata ? "NO" : "SI"
      }
    })

    )
  }


  const [anticipato, setAnticipato] = useState(false)

  const handleAnticipato = (e) => {
    setAnticipato(e.target.checked)
    setInvio(prev => ({
      ...prev,
      invio: {
        ...prev.invio
      },
      fattura: {
        ...prev.fattura,
        anticipato: anticipato ? "NO" : "SI"
      }
    })

    )
  }

  const [opposizione, setOpposizione] = useState(false)

  const handleOpposizione = (e) => {
    setOpposizione(e.target.checked)
    setInvio(prev => ({
      ...prev,
      invio: {
        ...prev.invio
      },
      fattura: {
        ...prev.fattura,
        opposizione: opposizione ? "NO" : "SI"
      }
    })

    )
  }

  const [tracciato, setTracciato] = useState(true)

  const handleTracciato = (e) => {
    setTracciato(e.target.checked)
    setInvio(prev => ({
      ...prev,
      invio: {
        ...prev.invio
      },
      fattura: {
        ...prev.fattura,
        tracciato: tracciato ? "SI" : "NO"
      }
    })

    )
  }



  return (
    <Container maxWidth="md" style={{
      background: "#f8f8f8", padding: 20, borderRadius: 6, marginTop: -20,

      /*boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",*/
      boxShadow: " rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
    }}>
      <AppBar position="static" style={{ alignItems: 'center', marginBottom: 20 }}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="span">
            NUOVA FATTURA

          </Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: 2, minWidth: 520 }}>
          {/*
        <Autocomplete
      disablePortal
      options={data.map((user)=> (
        user.nome +" "+  user.cognome + " "+ user.cf
      ))}
    
      renderInput={(params) => <TextField {...params} value={params.cf} label="Utente" />}
    />
    */}

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Utente</InputLabel>
            <Select
              required
              id="demo-simple-select"
              value={invio.fattura.utente}
              name="utente"
              label="Utente"
              onChange={handleChange}
            >

              {
                data.map((utente, index) => (

                  <MenuItem key={index} value={utente.cf}>{utente.nome} {utente.cognome} {utente.cf} </MenuItem>
                ))

              };
            </Select>
          </FormControl>

        </Box>

        <Grid2 container spacing={2} sx={{ marginBottom: 2 }}>

          <TextField
            style={{ width: 100 }}
            label={"Numero"}
            name={"numFat"}
            type={"text"}
            value={invio.fattura.numFat}
            onChange={handleChange}
          //onChange={(newValue) => setValue(newValue)}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>


            {/* <DemoContainer components={['DatePicker']}>*/}
            <DatePicker label="Data Fat." //value={invio.fattura.dataFat}
              //  onChange={(newValue) => setValue(newValue)} 
              format="DD-MM-YYYY"
              name={"dataFat"}
              //value={dataFat}
              slotProps={{
                textField: {
                  required: true,
                },
              }}
              onChange={

                (newValue) => (


                  setInvio(prev => (
                    {
                      ...prev,
                      invio: {
                        ...prev.invio,
                      },
                      fattura: {
                        ...prev.fattura,
                        dataFat: (new Date(newValue).toLocaleDateString())
                      }
                    }
                  )

                  )
                )

              } />


            {/* <FormControlLabel control={<Switch />} label="Pagata" />*/}

            <DatePicker label="Data Pag."
              format="DD-MM-YYYY"
              //name={"dataPag"}
              //value={dataPag}
              onChange={(newValue) => (
                setPagata(true),
                setInvio(prev => (
                  {
                    ...prev,
                    invio: {
                      ...prev.invio,
                    },
                    fattura: {
                      ...prev.fattura,
                      dataPag: (new Date(newValue).toLocaleDateString()),
                      fatPag: "SI",
                    }
                  }
                )

                )

              )

              }

            />

          </LocalizationProvider>



          <TextField
            style={{ width: 100 }}
            label={"N.Disp."}
            name={"numDisp"}
            type={"text"}

            value={invio.fattura.numDisp}
            defaultValue="1"
            helperText="N.dispositivo"
            onChange={handleChange}
          />
          <TextField
            style={{ width: 120 }}
            label={"Importo"}
            name={"impTot1"}
            type={"text"}

            value={invio.fattura.impTot1}
            onChange={handleChange}
            slotProps={{
              input: {
                startAdornment:
                  <InputAdornment position="start">

                    <EuroIcon style={{ width: 15 }} />
                  </InputAdornment>
              },
            }}
          />
          <FormControlLabel control={<Switch defaultChecked
            checked={tracciato}
            onChange={handleTracciato}

          />} label="Tracciato" />
          <FormControlLabel control={<Switch
            checked={anticipato}
            onChange={handleAnticipato}


          />} label="Anticipato" />
          <FormControlLabel control={<Switch
            checked={opposizione}
            onChange={handleOpposizione}


          />} label="Opposizione" />
          <Box sx={{ minWidth: 90 }}>
            <FormControl fullWidth>
              <InputLabel id="Nat.Iva-label">Nat.Iva</InputLabel>
              <Select
                defaultValue={"N2.2"}

                id="Nat.Iva"
                name="natIva1"
                // value={invio.fattura.natIva1}
                label="Nat.Iva"
                onChange={handleChange}

              >
                <MenuItem value="N2.2">N2.2</MenuItem>
                <MenuItem value="N2.1">N2.1</MenuItem>
                <MenuItem value="N1">N1</MenuItem>

              </Select>
            </FormControl>

          </Box>
          <Box sx={{ minWidth: 90 }}>
            <FormControl fullWidth>
              <InputLabel id="tipospesa-label">Tipo spesa</InputLabel>
              <Select
                defaultValue={"SP"}
                name="tipoSpesa"
                id="tipoSpesa"
                value={invio.fattura.tipoSpesa}
                label="Tipo Spesa"
                onChange={handleChange}

              >
                <MenuItem value="SP">SP</MenuItem>
                <MenuItem value="AA">AA</MenuItem>

              </Select>
            </FormControl>

          </Box>
          <FormControlLabel value={aggiungi}
            onChange={handleAggiungi}
            control={<Checkbox />} label="Aggiungi bollo" />
          <Box sx={{ minWidth: 90 }}>
            <FormControl fullWidth>
              <InputLabel id="Nat.Iva2-label">Nat.Iva</InputLabel>

              <Select

                defaultValue={"N2.2"}
                id="Nat.Iva2"
                name="natIva2"
                //value={invio.fattura.natIva2}
                label="Nat.Iva2"
                disabled={!aggiungi}
                onChange={handleChange}

              >
                <MenuItem value="N2.2" >N2.2</MenuItem>
                <MenuItem value="N2.1">N2.1</MenuItem>
                <MenuItem value="N1">N1</MenuItem>

              </Select>
            </FormControl>

          </Box>
          <TextField
            style={{ width: 120 }}
            label={"Importo bollo"}
            name={"bollo"}
            type={"text"}
            disabled={!aggiungi}
            //value={formData.numero}
            onChange={handleChange}
            slotProps={{
              input: {
                startAdornment:
                  <InputAdornment position="start">

                    <EuroIcon style={{ width: 15 }} />
                  </InputAdornment>
              },
            }}
          />
          <Box sx={{ minWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tipo documento</InputLabel>
              <Select
                name="tipoDoc"
                id="demo-simple-select"
                value={invio.fattura.tipoDoc}
                label="Tipo documento"
                // onChange={handleDocumento}
                onChange={handleChange}
              >
                <MenuItem value={"Fattura"}>Fattura</MenuItem>
                <MenuItem value={"Documento"}>Documento</MenuItem>

              </Select>


            </FormControl>
          </Box>
          <FormControlLabel control={<Switch
            checked={pagata}
            onChange={handlePagata}
            inputProps={{ 'aria-label': 'controlled' }}

          />} label="Pagata"

          />
          <TextField
            fullWidth
            name="esito"
            value={esito}
            disabled
            helperText="Esito invio"
          >

          </TextField>

        </Grid2>

        <Grid2  >
          <Button style={{ margin: 10 }} type="button" onClick={salvaFattura} variant="contained" color="primary">
            Salva
          </Button>
          <Button style={{ margin: 10 }} type="button" onClick={invia} variant="contained" color="primary">
            Invia
          </Button>
          {/*<Button style={{ margin: 10 }} type="button" variant="contained" color="primary">
            Cancella
          </Button> */}


        </Grid2>
        {isLoading && <LinearProgress />}
      </form>
    </Container>
  );
};

export default NuovaFattura;
