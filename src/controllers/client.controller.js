import { clientService } from '../services/client.service';
import clientView from '../views/client.html';
import navbar from '../views/navbar.html';
import { authService } from '../services/auth.service';
import { tokenService } from '../services/token.service';

import moment from 'moment';
import { HttpService } from '../services/http.service';
class ClientController {
    constructor() { }
    async init() {
        try {
            if (!tokenService.getToken()) {
                location.replace('/#/300');
                return;
            }

            const getRowClientTable = function (client) {
                expirationDateMoment = moment(client.last_payment);
                expirationDate = expirationDateMoment.add(1, 'months').format("DD/MM/YYYY");
                daysLeft = expirationDateMoment.diff(nowDateMoment, 'days');
                return `
            <tr>
                <td>${client.name} ${client.lastname}</td>
                <td>${moment(client.birthdate).format("DD/MM/YYYY")}</td>
                <td>${expirationDate}</td>
                <td>${daysLeft > 0 ? daysLeft : 'EXPIRED'}</td>
                <td><a href="#/client/edit/?clientId=${client.id}">Edit</a></td>
                <td><a href="#/client/add-payment/?clientId=${client.id}">Add payment</a></td>
                <td>${client.active ? "Yes" : "No"}</td>
                <td><a href="#/client/payment-history/?clientId=${client.id}">Payment history</a></td>
                <td><a class="danger" href="#/client/delete/?clientId=${client.id}">Delete</a></td>
            </tr>`;
            }

            const responseUser = await authService.getUser();
            const user = await responseUser.json();
            const divElement = document.createElement('div');
            divElement.innerHTML = clientView;
            const navbarElement = divElement.querySelector('#navbar');
            navbarElement.innerHTML = navbar;
            const clientElement = divElement.querySelector('#client-table');
            const orderElement = divElement.querySelector('#order');
            const response = await clientService.findByBranchOffice(user.branchOfficeId);
            const data = await response.json();
            let expirationDate;
            let expirationDateMoment;
            const nowDateMoment = moment([]);
            let daysLeft;
            data.forEach(client => {
                clientElement.innerHTML += getRowClientTable(client);
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
                    clientElement.innerHTML += getRowClientTable(client);
                });
            });

            orderElement.addEventListener('change', async (e) => {
                const orderedClientsJson = await clientService.findByBranchOffice(user.branchOfficeId, orderElement.value);
                const orderedClients = await orderedClientsJson.json();
                clientElement.innerHTML = '';
                orderedClients.forEach(client => {
                    clientElement.innerHTML += getRowClientTable(client);
                })

            });

            return divElement;
        } catch (error) {
            console.error(error);
            location.replace('/#/500');
        }

    }
}

const controller = new ClientController();
export default controller.init;