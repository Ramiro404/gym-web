import view from '../views/home.html';
import navbar from '../views/navbar.html';
import { tokenService } from '../services/token.service';
class HomeController {
    constructor() {}

    init() {
        if (!tokenService.getToken()) {
            location.replace('/#/300');
            return;
        }
        const divElement = document.createElement('div');
        divElement.innerHTML = view;
        const navElement = divElement.querySelector('#navbar');
        navElement.innerHTML = navbar;
        return divElement;
    }
}

const controller = new HomeController();
export default controller.init;