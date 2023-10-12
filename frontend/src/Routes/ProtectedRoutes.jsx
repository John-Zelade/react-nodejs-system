import { useLocation, Outlet, Navigate } from "react-router-dom";
import UserService from "../services/user.service";

const AdminRoutes = (props) => {
    //const location=useLocation();
    let token = props.authToken
    let auth={'token':token}
    let user=JSON.parse(localStorage.getItem("user"));


    return (
      auth.token && user.Role === props.requiredRole ? <Outlet/> : <Navigate to={'/'}/>
    )
};

export default AdminRoutes;