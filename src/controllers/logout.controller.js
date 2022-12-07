import {tokenService} from '../services/token.service';
import view from '../views/logout.html';
class LogoutController{
    constructor() {}
    async init(){
        const divElement = document.createElement('div');
        divElement.innerHTML = view;
        tokenService.removeToken();
        setTimeout(() => {
            location.replace("/#/login");
        }, 1500);
        return divElement;
    }
}
const controller = new LogoutController();
export default controller.init;