import axios from "axios";
import proxy from "../proxy/proxy";

export async function getProprietario() {
    const username = localStorage.getItem('authToken');

    const risposta = axios.post(`${proxy}/proprietario?username=${username}`)
    return risposta;
}

export async function getUtente(cf) {
    const username = localStorage.getItem('authToken');
    try {
        const risposta = axios.post(`${proxy}/trovautentecf?cf=${cf}&username=${username}`)
        return risposta;
    }
    catch {
        console.log("errore nel get utente")
        return null;
    }

}

export async function getFattura() {
    try {
        const response = await axios.post(`${proxy}/trovaFattura?id=${id.id} `)
        return response;
    }
    catch {
        console.log("errore nel get fattura")
        return null;
    }

}