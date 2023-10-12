import { Outlet, Navigate } from "react-router-dom";

const PublicRoutes = (props) => {
  let token = props.authToken
  let user= JSON.parse(localStorage.getItem("user"));

  let auth={'token':token}

        return(
            !auth.token ? <Outlet/> : user.Role === props.allowedRole.user ? <Navigate to={'/user'}/> : <Navigate to={'/admin'}/>
        )
};

export default PublicRoutes;