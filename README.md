# Invio Sistema Tessera Sanitaria – Frontend

Questo è il frontend di un’applicazione pensata per l’inserimento e la gestione delle fatture emesse da professionisti sanitari da inviare al Sistema Tessera Sanitaria 
per la detrazione delle spese fiscali.  
È stato realizzato in **React**  **Vite**, utilizzando **Material UI** per l’interfaccia.

Come funzioni principali vi sono la possibilità inserire e modificare i dati utente e di fatture, ricerca dei dati inseriti, eliminazione e cancellazione dell’account.
Sono state inoltre implementate le pagine di Login/Registrazione/Recupero password.

> ⚠️ Per il corretto funzionamento è necessario un backend (sviluppato separatamente in Java Spring Boot), che non è incluso in questo repository.


## Backend di test (in arrivo)

A breve sarà disponibile un backend separato dedicato ai test, con dati fittizi e senza invii a sistemi reali.  
Questo permetterà di provare l’app in sicurezza, senza utilizzare dati personali o sensibili.

Aggiornerò il repository non appena sarà pronto.

---

## Tecnologie utilizzate

- React + Vite
- Material UI
- Axios
- React Router DOM
- React Hook Form
- Day.js, date-fns

---

## Avvio del progetto

Per avviare il frontend in locale:

```bash
npm install
npm run dev
```

## Test con dati fittizi

Per testare il funzionamento dell'app in ambiente di prova (senza inviare dati reali), è possibile utilizzare le seguenti credenziali:

- **Codice Fiscale**: QUIQQU98A01H501H  
- **Password**: Salve123
- **PIN Code**: 3167676525
- **Partita IVA**: 65432109876

Questi dati sono validi solo per l’ambiente di test. 
L’invio effettuato da questi dati non ha alcuna validità fiscale.

