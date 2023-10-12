import api from "./api";

class UserService {
    fetchData() {
      return api.get('/user/users');
    }
     getRefreshAccessToken(){
      return api.get('auth/refresh-token', {withCredentials: true});
    }
}

export default new UserService();