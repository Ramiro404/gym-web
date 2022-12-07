import view from '../views/unauthorized.html';
class UnauthorizedController{
    constructor(){}
    init() {
        const divElement = document.createElement('div');
        divElement.innerHTML = view;
        return divElement;
    }
}

const controller = new UnauthorizedController();
export default controller.init;