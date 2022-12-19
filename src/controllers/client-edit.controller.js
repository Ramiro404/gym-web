import view from '../views/client-edit.html';
import navbar from '../views/navbar.html';
import { authService } from '../services/auth.service';
import { clientService } from '../services/client.service';
import { DateFormatter } from '../utils/DateFormatter';
import queryString from 'query-string';
import { tokenService } from '../services/token.service';
import moment from 'moment';

class ClientEditController {
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

            const name = divElement.querySelector('#name');
            const lastname = divElement.querySelector('#lastname');
            const birthdate = divElement.querySelector('#birthdate');
            const radioActive = divElement.querySelector('#active');
            const radioNoactive = divElement.querySelector('#noactive');
            const form = divElement.querySelector('#form');
            const urlParams = (window.location.href).split('?')[1];
            const params = queryString.parse(urlParams);
            const clientJson = await clientService.findOne(params.clientId);
            const client = await clientJson.json();
            console.log(client)
            name.value = client.name;
            let active;
            lastname.value = client.lastname;
            if (client.active) {
                active = true;
                radioActive.checked = true
            } else {
                radioNoactive.checked = true;
            }
            birthdate.value = moment(client.birthdate).format("YYYY-MM-DD");
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                console.log(radioActive.checked, ' ', radioNoactive.checked)
                await clientService.update(client.id, { name: name.value, lastname: lastname.value, birthdate: birthdate.value, active: radioActive.checked });
                location.replace('/#/clients');
            });
            return divElement;
        } catch (error) {
            console.error(error);
            location.replace('/#/500');
        }

    }
}

const controller = new ClientEditController();
export default controller.init;