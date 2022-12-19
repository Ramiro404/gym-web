import view from '../views/membership-form.html';
import { membershipService } from '../services/membership.service';
import queryString from 'query-string';
import { authService } from '../services/auth.service';
import { tokenService } from '../services/token.service';
import navbar from "../views/navbar.html"

class MembershipFormController {
    constructor(){}
    async init(){
        if (!tokenService.getToken()) {
            location.replace('/#/300');
            return;
        }

        const divElement = document.createElement('div');
        divElement.innerHTML = view;
        const navbarElement = divElement.querySelector("#navbar");
        navbarElement.innerHTML = navbar;

        const name = divElement.querySelector('#name');
        const price = divElement.querySelector('#price');
        const description = divElement.querySelector('#description');
        const form = divElement.querySelector('#form');
        
        const userJson = await authService.getUser();
        const user = await userJson.json();

        const urlParams = (window.location.href).split('?')[1];
        const params = queryString.parse(urlParams);

        if(params.membershipId){
            const membershipJson = await membershipService.findOne(params.membershipId);
            const membership = await membershipJson.json();
            name.value = membership.name;
            price.value = membership.price;
            description.value = membership.description;
        }

        form.addEventListener('submit', async(e)=> {
            e.preventDefault();
            console.log(name.value, ' ', price.value)
            if(params.membershipId){
                await membershipService.update(params.membershipId, {
                    name: name.value,
                    price: price.value,
                    description: description.value
                });
            } else {
                await membershipService.create({
                name: name.value,
                price: price.value,
                description: description.value,
                branchOfficeId: user.branchOfficeId,
             });
            }
            location.replace('/#/memberships');
            //location.replace('/#/memberships')
        })


        return divElement;
    }
}
const controller = new MembershipFormController();
export default controller.init;