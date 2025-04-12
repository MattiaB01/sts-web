
import logo from "./assets/STS_Logo.jpeg";

export default function Logo(){

    return(
        <>
       
        <img src={logo} alt="Logo" width="460" height="460" style={{ color:"black", borderRadius:"50%",
        
        boxShadow:" rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        
        
        }} />
        </>
    )
}