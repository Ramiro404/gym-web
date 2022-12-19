import view from '../views/error-500.html';

class Error500Controller{
    constructor(){}

    init() {
        const divElement = document.createElement('div');
        divElement.innerHTML = view;
        return divElement
    }
}
const controller = new Error500Controller();
export default controller.init;