import view from '../views/payment-form.html';
import { tokenService } from '../services/token.service';
import { authService } from '../services/auth.service';
import {membershipService} from '../services/membership.service';
import {clientService} from '../services/client.service';
import queryString from 'query-string';
import { DateFormatter } from '../utils/DateFormatter';

class PaymentForm {
    constructor() {}
    async init() {
        if(!tokenService.getToken()){
            location.replace('/#/300');
            return;
        }
        const divElement = document.createElement('div');
        divElement.innerHTML = view;

        const formElement = divElement.querySelector('#form');
        const clientElement = divElement.querySelector('#client-data');
        const membershipElement = divElement.querySelector('#membership');
        const priceElement = divElement.querySelector('#price');
        const paymentDateElement = divElement.querySelector("#payment-date");

        const urlParams = (window.location.href).split('?')[1];
        const params = queryString.parse(urlParams);
        const userJson = await authService.getUser();
        const user = await userJson.json();
        const membershipJson = await membershipService.findByBranchOffice(user.branchOfficeId);
        const memberships = await membershipJson.json();
        const clientJson = await clientService.findOne(params.clientId);
        const client = await clientJson.json();
        const paymentJson = await clientService.getLastPayment(params.clientId);
        const payment = await paymentJson.json();


        clientElement.textContent = `Client: ${client.name} ${client.lastname}`;
        let defaultMembership = memberships.filter(m => m.id === payment[0].membership_id)[0];
        priceElement.textContent = `$${defaultMembership.price}`;
        
        const dateFormatted = DateFormatter.FormatDateForInput(payment[0].last_payment);
        paymentDateElement.value = dateFormatted;
        console.log(dateFormatted, ' ', payment[0].last_payment)
        
        memberships.forEach(membership => {
            membershipElement.innerHTML += `
                <option value="${membership.id}" ${defaultMembership.id === membership.id ? 'selected': ''}>${membership.name}</option>
            `;
        })
        membershipElement.addEventListener('change', (e)=> {
            const selectedMembership = memberships.find(m => membershipElement.value == m.id)
            priceElement.textContent = `$${selectedMembership.price}`
        });


        formElement.addEventListener('submit', async(e)=> {
            e.preventDefault();
            await clientService.addPayment({
                paymentDate: payment[0].last_payment,
                clientId: params.clientId,
                membershipId: membershipElement.value,
            });
            location.replace('/#/clients');
        })

        return divElement;
    }
}

const controller = new PaymentForm();
export default controller.init;