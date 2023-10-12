import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
//import axios from 'axios';
import { useNavigate } from "react-router-dom";
import TokenService from "../../../utils/Auth";
import api from "../../../services/api";
import UserService from "../../../services/user.service";

const AdminHomepage = (props) => {
    const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const fetchUsers = async () => {
    UserService.fetchData()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.status === 401);
        console.log(error.response.data);
        if(error.response.status === 401){
          // used to refresh page.
          //window.location.reload();
          navigate(0);
        }else{
            localStorage.clear();
            TokenService.removeAccessToken();
            navigate("/");
        }
        
      });
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const getAuth =async()=>{
      UserService.getRefreshAccessToken().then((response)=>{
      console.log(response);
    })
  }
  
  const logOut = async (e) => {
    e.preventDefault();
    await api.get(`http://localhost:3000/api/auth/logout`).then((response) => {
      localStorage.clear();
      TokenService.removeAccessToken();
      //console.log(response);
      window.location.href = "/";
    });
  };
  return (
    <>
      Hello admin
      <div>
        <Button onClick={logOut}>Logout</Button>
        <Button onClick={getAuth}>Get Auth</Button>
      </div>
    </>
  );
};

export default AdminHomepage;
