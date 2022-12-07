import view from '../views/profile.html';
import navbar from '../views/navbar.html';
import {authService} from '../services/auth.service';
import {tokenService} from '../services/token.service'

class ProfileController {
    constructor() {}
    async init() {
        if (!tokenService.getToken()) {
            location.replace('/#/300');
            return;
        }
        
        const divElement = document.createElement('div');
        divElement.innerHTML = view;
        const navbarElement = divElement.querySelector('#navbar');
        navbarElement.innerHTML = navbar;
        if(tokenService.getToken()) {
            const profileElement = divElement.querySelector('#profile');
            const response = await authService.getUser();
            const user = await response.json();
            console.log(user);
            profileElement.innerHTML = `${user.id} ${user.email}`;
            return divElement;
        }
        return divElement;
    }
}
const controller = new ProfileController();
export default controller.init;