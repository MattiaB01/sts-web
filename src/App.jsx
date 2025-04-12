import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import ProtectedRoute from "./protected_routes";
import NotFound from "./Error404";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { useState } from "react";
import Registrazione from "./Registrazione";
import { Switch } from "@mui/material";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {



  return (
    

    
    
  <Router>     
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/registrati" element={<Registrazione />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />

          {/* 👇 Rotta 404 per tutte le pagine non definite */}
          <Route path="*" element={<NotFound />} />
        </Route>
        
      </Routes>
      </Router>
    
    

  );
};

export default App;