import { environments } from '../environments'
import { HttpService } from '../services/http.service';
import {tokenService} from '../services/token.service';
import {userService} from '../services/user.service'
class AuthService {
    constructor() {
        this.URL = `${environments.apiUrl}/auth`;
        this.user = null;
    }
    login(email, password) {
        return HttpService.Post(`${this.URL}/login`, { email, password });
    }
     getUser() {
        const payload = tokenService.getDecodedToken()
        if(payload) {
            return userService.findOne(payload.sub);
        }
        return null;
    }
}

const authService = new AuthService();
export { authService }