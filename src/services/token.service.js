import jwtDecode from "jwt-decode";
class TokenService {
    constructor(){}
    getToken() {
        const token = localStorage.getItem('GYM_SYSTEM');
        if(token) return token;
        return null;
    }
    setToken(token) {
        localStorage.setItem('GYM_SYSTEM', token);
    }
    getDecodedToken() {
        if(this.getToken()) {
            return jwtDecode(this.getToken());
        }
        return null;
    }
    removeToken() {
        localStorage.removeItem('GYM_SYSTEM');
    }
}
const tokenService = new TokenService();
export {tokenService};