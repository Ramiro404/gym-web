import view from '../views/client-edit.html';
import navbar from '../views/navbar.html';
import {authService } from '../services/auth.service';
import {clientService} from '../services/client.service';
import {DateFormatter} from '../utils/DateFormatter';
import queryString from 'query-string';
import { tokenService } from '../services/token.service';

class ClientEditController{
    constructor() {}
    async init() {
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
        const form = divElement.querySelector('#form');
        const urlParams = (window.location.href).split('?')[1];
        const params = queryString.parse(urlParams);
        const clientJson = await clientService.findOne(params.clientId);
        const client = await clientJson.json();
        console.log(client)
        name.value = client.name;
        lastname.value = client.lastname;
        birthdate.value = DateFormatter.FormatDateForInput(new Date(client.birthdate));
        form.addEventListener('submit', async(e)=>{
            e.preventDefault();
            await clientService.update(client.id, { name: name.value, lastname: lastname.value, birthdate: birthdate.value});
            location.replace('/#/clients');
        });
        return divElement;
    }
}

const controller = new ClientEditController();
export default controller.init;