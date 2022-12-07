import { membershipService } from "../services/membership.service";
import view from "../views/membership.html";
import navbar from '../views/navbar.html';
import {authService} from '../services/auth.service';
import {tokenService} from '../services/token.service';
class MembershipController {
    constructor() { }
    async init() {
        if(!tokenService.getToken()){
            location.replace('/#/300');
            return;
        }
        const responseUser = await authService.getUser();
        const user = await responseUser.json();
        const divElement = document.createElement('div');
        divElement.innerHTML = view;
        const navbarElement = divElement.querySelector('#navbar');
        navbarElement.innerHTML = navbar;
        const membershipElement = divElement.querySelector('#membership');
        const response = await membershipService.findByBranchOffice(user.branchOfficeId);
        const data = await response.json();
        data.forEach(membership => {
            membershipElement.innerHTML += `
            <h3>${membership.name}</h3>
            <p>${membership.description}</p>
            <h5>${membership.price}</h5>
            <a href="/#/membership/form/?membershipId=${membership.id}">Edit</a>
        `;
        });
        return divElement;
    }
}
const controller = new MembershipController();
export default controller.init;