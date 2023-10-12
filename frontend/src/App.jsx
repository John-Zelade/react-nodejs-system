import "./assets/css/App.css";
import PublicRoutes from "./Routes/PublicRoutes";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
//import UserRoutes from "./Routes/UserRoutes";
import LandingPage from "./components/pages/LandingPage";
import UserHomepage from "./components/pages/user-page-components/UserHomepage";
import AdminHomepage from "./components/pages/admin-page-components/AdminHomepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TokenServices from "../src/utils/Auth";

function App() {
  const authToken=TokenServices.getAccessToken();
  const requiredRole = {
    admin: "ROLE_ADMIN",
    user: "ROLE_USER"
  };
  const allowedRole = {
    admin: "ROLE_ADMIN",
    user: "ROLE_USER"
  };
  /*const config=()=>{
    const config={
      headers: {
          "Authorization":'Bearer='+authToken
        },
    };
    return config;
  }*/
  //let getAuth=async()=>{
  //  console.log(await TokenServices.getAuthTokenHeader());
  //}
  //getAuth();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes  requiredRole={requiredRole.user} authToken={authToken}/>}>
            <Route path="/user" element={<UserHomepage/>}/>
          </Route>

          <Route element={<ProtectedRoutes  requiredRole={requiredRole.admin} authToken={authToken}/>}>
            <Route path="/admin" element={<AdminHomepage/>}/>
          </Route>

          <Route element={<PublicRoutes  allowedRole={allowedRole} authToken={authToken}/> }>
            <Route index element={<LandingPage  allowedRole={allowedRole} authToken={authToken}/>} />
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
