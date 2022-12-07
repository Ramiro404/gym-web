import { clientService } from '../services/client.service';
import clientView from '../views/client.html';
import navbar from '../views/navbar.html';
import { authService } from '../services/auth.service';
import { tokenService } from '../services/token.service';

class ClientController {
    constructor() { }

    async init() {
        if (!tokenService.getToken()) {
            location.replace('/#/300');
            return;
        }
        const responseUser = await authService.getUser();
        const user = await responseUser.json();
        const divElement = document.createElement('div');
        divElement.innerHTML = clientView;
        const navbarElement = divElement.querySelector('#navbar');
        navbarElement.innerHTML = navbar;
        const clientElement = divElement.querySelector('#client-table');
        const response = await clientService.findByBranchOffice(user.branchOfficeId);
        const data = await response.json();
        data.forEach(client => {
            clientElement.innerHTML += `
                <tr>
                    <td>${client.name} ${client.lastname}</td>
                    <td>${client.birthdate}</td>
                    <td>${client.last_payment}</td>
                    <td>Status</td>
                    <td><a href="#/client/edit/?clientId=${client.id}">Edit</a></td>
                    <td><a href="#/client/add-payment/?clientId=${client.id}">Add payment</a></td>
                    <td><a href="#/client/payment-history/?clientId=${client.id}">Payment history</a></td>
                    <td><a href="#/client/delete/?clientId=${client.id}">Delete</a></td>
                </tr>
        `;
        });

        const formElement = divElement.querySelector('#clientForm');
        formElement.addEventListener('submit', async (e) => {
            e.preventDefault();
            const searchValue = divElement.querySelector('#search').value.toLowerCase();
            const filteredClients = data.filter(client => {
                const fullName = (client.name + ' ' + client.lastname).toLowerCase();
                return fullName.includes(searchValue);
            });
            clientElement.innerHTML = '';
            filteredClients.forEach(client => {
                clientElement.innerHTML += `
                <tr>
                    <td>${client.name} ${client.lastname}</td>
                    <td>${client.birthdate}</td>
                    <td>${client.last_payment}</td>
                    <td>Status</td>
                    <td><a href="#/client/edit/?clientId=${client.id}">Edit</a></td>
                    <td><a href="#/client/add-payment/?clientId=${client.id}">Add payment</a></td>
                    <td><a href="#/client/delete/?clientId=${client.id}">Delete</a></td>
                    
                </tr>
        `;
            })
        })

        return divElement;
    }
}

const controller = new ClientController();
export default controller.init;