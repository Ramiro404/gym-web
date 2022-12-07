import view from './login.html';

class LoginComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }
    getTemplate() {
        const template = document.createElement('template');
        template.innerHTML = view;
        return template;
    }
    submitForm() {
        const form = document.querySelector('#loginForm');
        const email = form.elements["email"].value;
        const password = form.elements["password"].value;

    }
    connectedCallback() {
        this.render();
    }
    disconnectedCallback() {
        console.log('Bye dom')
    }
    render() {
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))
    }
}
customElements.define('login-component', LoginComponent);