import view from '../views/home.html';
import navbar from '../views/navbar.html';
import { tokenService } from '../services/token.service';
import '../style.css';
import { authService } from '../services/auth.service';
import { branchOfficeService } from '../services/branch-office.service';
import { gymService } from '../services/gym.service';

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

class HomeController {
    constructor() { }

    async init() {
        try {
            if (!tokenService.getToken()) {
                location.replace('/#/300');
                return;
            }
            const divElement = document.createElement('div');
            divElement.innerHTML = view;
            const navElement = divElement.querySelector('#navbar');
            navElement.innerHTML = navbar;

            const userJson = await authService.getUser();
            const user = await userJson.json();

            const branchOfficeJson = await branchOfficeService.findOne(user.branchOfficeId);
            const branchOffice = await branchOfficeJson.json();

            const gymJson = await gymService.findOne(branchOffice.gymId)
            const gym = await gymJson.json();

            const titleElement = divElement.querySelector("#title");
            const branchOfficeElement = divElement.querySelector("#branch-office");

            titleElement.textContent = `Welcome to ${gym.name}`;
            branchOfficeElement.textContent = `${branchOffice.name}`


            return divElement;
        } catch (error) {
            console.error(error);
            location.replace('/#/500');
        }

    }
}

const controller = new HomeController();
export default controller.init;