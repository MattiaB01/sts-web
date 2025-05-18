import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NuovoUtente from './NuovoUtente';
import Divider from '@mui/material/Divider';
import ListaUtenti from './ListaUtenti';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import Logo from './Logo';
import DatiProprietario from './DatiProprietario';
//import ElencoUtenti from "./ElencoUtenti";
import NuovaFattura from './NuovaFattura';

import BlurCircularIcon from '@mui/icons-material/BlurCircular';
import ElencoFatture from './ElencoFatture';
import ModificaUtente from './ModificaUtente';
import ModificaFattura from './ModificaFattura';

import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import Modal from '@mui/material/Modal';

import { Navigate, useNavigate } from "react-router-dom";
import { Padding } from '@mui/icons-material';

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


function TabPanel(props) {
  const { children, value, index, ...other } = props;






  /*
  const load =(e) => {
    e.preventDefault(); // Impedisce il comportamento predefinito del form
  }

   window.addEventListener('load',load);*/

  return (

    <div
      style={{ margin: "0 auto" }}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {

  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Home() {
  

  const username= localStorage.getItem('authToken').toUpperCase();
 
  const [id,setId] = React.useState();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const logout2 = () => {

    localStorage.removeItem('authToken');
    navigate("/");
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue,id) => {
    setValue(newValue,id);
    setId(id);
    console.log("id",id)

    if (event) {
      <AlertDialog/>
    }
  };

  return (
    < >
    <div style={{minWidth:1480,marginLeft:-100,marginTop:-10,background:"#eeeeee",borderRadius:6, maxHeight:695,
      
      boxShadow: '0px 0px 55px -5px rgba(0,0,0,0.82)',
    }}>
      
      <div>
  
       {/* <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal> */}
      </div>
    <Typography style={{textAlign:"start",marginLeft:50, color:"#004a98",padding:10}}> Ciao {username} </Typography>
      <Box
        sx={{ flexGrow: 1, /*bgcolor: 'background.paper'*/ display: 'flex', height:580, paddingRight:5, paddingLeft:5, paddingBottom:3 }}
      
      >
        
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab icon={<BlurCircularIcon />} iconPosition='start' label="Home" {...a11yProps(0)} />

          <Tab label="I tuoi dati" {...a11yProps(1)} />
          <Tab label="" icon={<Divider />} disabled />
          <Tab label="Nuovo utente" {...a11yProps(3)} />
          <Tab label="Elenco utenti" {...a11yProps(4)} />
          {value === 5 && <Tab label="Modifica" {...a11yProps(5)} />}
          {value != 5 && <Tab icon={<Divider />} disabled />}
          <Tab label="Nuova Fattura" {...a11yProps(6)} />
          <Tab label="Elenco Fatture" {...a11yProps(7)} />
          {value === 8 && <Tab label="Modifica" {...a11yProps(8)} />}
          {value != 8 && <Tab icon={<Divider />} disabled />}
          {/*<Tab label="ESCI" {...a11yProps(9)} />*/}

        </Tabs>
        <TabPanel value={value} index={0}>
          <Logo />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DatiProprietario />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <NuovoUtente />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <ListaUtenti handleChange={handleChange} />
        </TabPanel>

        <TabPanel value={value} index={5}>
          <ModificaUtente id={id}/>
        </TabPanel>
        <TabPanel value={value} index={6}>
          <NuovaFattura />
        </TabPanel>
        <TabPanel value={value} index={7}>
          <ElencoFatture handleChange={handleChange} />
        </TabPanel>
        <TabPanel value={value} index={8}>
          <ModificaFattura id={id}/>
        </TabPanel>
     

      </Box>
      <Box sx={{ display: "flex", justifyContent: "start", position: "relative", bottom: 20, marginLeft: "3%" }}>
        <Button variant="contained" onClick={logout2}> Esci </Button>
      </Box>
      </div>
    </>
 
  );
}