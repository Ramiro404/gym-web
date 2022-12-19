import { tokenService } from '../services/token.service';
import view from '../views/payment-history.html';
import { clientService } from '../services/client.service';
import queryString from 'query-string';
import moment from 'moment';
import navbar from '../views/navbar.html'
class PaymentHistoryController{
    constructor(){}

    async init(){
        if (!tokenService.getToken()) {
            location.replace('/#/300');
            return;
        }
        const divElement = document.createElement('div');
        divElement.innerHTML = view;
        const navbarElement = divElement.querySelector('#navbar');
        navbarElement.innerHTML = navbar;
        const bodyDataElement = divElement.querySelector('#body-data');

        const urlParams = (window.location.href).split('?')[1];
        const params = queryString.parse(urlParams);
        const dataJson = await clientService.getPaymentHistory(params.clientId);
        const data = await dataJson.json();

        data.forEach(element => {
            bodyDataElement.innerHTML += `
                <tr>
                    <td>${element.name} ${element.lastname}</td>
                    <td>${element.code}</td>
                    <td>${moment(element.create_at).format("DD/MM/YYYY")}</td>
                    <td>${element.membership}</td>
                    <td>${element.price}</td>
                </tr>
            `
        });
        return divElement;

    }
}

const controller = new PaymentHistoryController();
export default controller.init;