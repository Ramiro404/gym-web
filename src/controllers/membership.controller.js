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
            <div class="card span-3">
                <div class="card-title">
                    <h2 class="mb-0">${membership.name}</h2>
                </div>
                <div class="card-body">
                    <p class="mb-0">${membership.description}</p>
                </div>
                <div class="card-footer">
                    <h3 class="mb-0">$${membership.price}</h3>
                    <a class="primary" href="/#/membership/form/?membershipId=${membership.id}">Edit</a>
                </div>
            </card>
        `;
        });
        return divElement;
    }
}
const controller = new MembershipController();
export default controller.init;