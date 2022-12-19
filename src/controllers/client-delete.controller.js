import { clientService } from '../services/client.service';
import view from '../views/delete-client.html';
import navbar from '../views/navbar.html';
import queryString from 'query-string';
class ClientDeleteController {
    constructor() { }
    async init() {
        try {
            const divElement = document.createElement('div');
            divElement.innerHTML = view;

            const clientElement = divElement.querySelector('#client-data');
            const urlParams = (window.location.href).split('?')[1];
            const params = queryString.parse(urlParams);

            const clientResponse = await clientService.findOne(params.clientId);
            const client = await clientResponse.json();
            const btnConfirmDelete = divElement.querySelector('#btn-delete');
            const navbarElement = divElement.querySelector('#navbar');
            navbarElement.innerHTML = navbar;

            clientElement.textContent = `${client.name} ${client.lastname}`;

            btnConfirmDelete.addEventListener('click', async (e) => {
                await clientService.delete(client.id);
                location.replace('/#/clients');
            })
            return divElement;
        } catch (error) {
            console.error(error);
            location.replace('/#/500');
        }

    }
}

const controller = new ClientDeleteController();
export default controller.init;