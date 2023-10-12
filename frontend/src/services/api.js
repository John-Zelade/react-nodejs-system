import axios, { Axios } from "axios";
import TokenService from "../utils/Auth";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer="+token;
      //config.headers["Cookies"]="refreshToken="+refreshToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/auth/signin" && err.response) {
      // If the error status is 401 and there is no originalRequest._retry flag,
      // it means the token has expired and we need to refresh it
      if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

        try {
          let RefreshToken=await TokenService.getRefreshToken();
          //console.log(await TokenService.getRefreshToken());
          console.log(RefreshToken);
          /*const refreshToken={
            refreshToken:TokenService.getRefreshToken(),
          }*/
           await instance.get("auth/refresh-access-token", {withCredentials: true})
          .then(async(response)=>{          
            const  accessToken = response.data.accessToken;
            TokenService.updateAccessToken(accessToken);

            return instance(originalConfig);
            
          }).catch((error)=>{
            console.log(error.response);
            if(error){
              localStorage.clear();
              TokenService.removeAccessToken();
            }
          });
        } catch (_error) {
            return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;