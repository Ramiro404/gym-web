import view from '../views/not-found.html'
class NotFoundController{
    constructor(){}

    init(){
        const divElement = document.createElement('div');
        divElement.innerHTML = view;
        return divElement;
    }
}

const controller = new NotFoundController();
export default controller.init;