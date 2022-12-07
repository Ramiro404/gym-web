import { authService } from '../services/auth.service';
import {tokenService } from '../services/token.service'
import view from '../views/login.html'

class LoginController {
    constructor(){}

     init() {
        const divElement = document.createElement('div');
        divElement.innerHTML = view;
        const btnSubmit = divElement.querySelector('#btnSubmit');
        const form = divElement.querySelector('#loginForm');
        form.addEventListener('submit', async(e) => {
            e.preventDefault();
            const email = divElement.querySelector('#email').value;
            const password = divElement.querySelector('#password').value;
            console.log(email, password);
            const response = await authService.login(email, password);
            const data = await response.json();
            if(data.token) {
                tokenService.setToken(data.token);
                location.replace('#/');
            }
            
        });

        return divElement;
    }
}
const controller = new LoginController();
export default controller.init;