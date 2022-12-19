import { authService } from '../services/auth.service';
import { membershipService } from '../services/membership.service';
import { clientService } from '../services/client.service';
import { tokenService } from '../services/token.service';
import view from '../views/client-form.html'
import navbar from '../views/navbar.html';
import moment from 'moment';

class ClientFormController {
    constructor() { }

    async init() {
        try {
            if (!tokenService.getToken()) {
                location.replace('/#/300');
                return;
            }
            const divElement = document.createElement('div');
            divElement.innerHTML = view;
            const navbarElement = divElement.querySelector('#navbar');
            navbarElement.innerHTML = navbar;
            const form = divElement.querySelector('#client-form');
            const responseUser = await authService.getUser();
            const user = await responseUser.json();
            const responseMembership = await membershipService.findByBranchOffice(user.branchOfficeId);
            const memberships = await responseMembership.json();
            const membershipElement = divElement.querySelector('#membership');
            memberships.forEach(membership => {
                membershipElement.innerHTML += `
                <option value=${membership.id}>${membership.name} - $${membership.price}</option>
            `;
            });

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const name = divElement.querySelector('#name').value;
                const lastname = divElement.querySelector('#lastname').value;
                const birthdate = divElement.querySelector('#birthdate').value;
                const membershipId = divElement.querySelector('#membership').value;
                const resultJson = await clientService.save({ name, lastname, birthdate, membershipId, paymentDate: moment().format(), branchOfficeId: user.branchOfficeId });
                const result = await resultJson.json();
                console.log(result);
                location.replace('/#/clients');
            });
            return divElement;
        } catch (error) {
            console.error(error);
            location.replace('/#/500');
        }

    }
}

const controller = new ClientFormController();
export default controller.init;