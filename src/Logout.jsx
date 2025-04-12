import { Navigate,useNavigate } from "react-router-dom";


export function Logout1() {
    const navigate = useNavigate();
 //localStorage.removeItem('authToken');
    function logout3 (){
        localStorage.removeItem('authToken');
        return navigate("/");
    }
//return  <Navigate to="/a" replace />;
   logout3();

}
//export default Logout1;