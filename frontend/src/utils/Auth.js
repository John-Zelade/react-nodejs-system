import Cookies from "js-cookie";
import api from "../services/api";

class TokenService{
    getRefreshToken =async()=>{
        //const refreshToken = JSON.parse(localStorage.getItem("user"));
        //return refreshToken.RefreshToken;
        const refreshToken = await api.get(`auth/refresh-token`, {withCredentials: true});
        return refreshToken.data;
    }
    getAccessToken =()=>{
        const authToken=Cookies.get('authToken');
        return authToken
    }
    updateAccessToken=(token)=>{
      Cookies.set('authToken', token)
    }
    removeAccessToken=()=>{
      Cookies.remove('authToken');
    }

}
export default new TokenService();