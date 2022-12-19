import { pages } from "../controllers";

const content = document.getElementById('root');
const router = async (route) => {
    content.innerHTML = '';
    if (route === '#/')
        return content.appendChild(await pages.home());
    if (route === '#/login')
        return content.appendChild(pages.login());
    if (route === '#/login')
        return content.appendChild(pages.login());
    if (route === '#/clients')
        return content.appendChild(await pages.client());
    if (route === '#/memberships')
        return content.appendChild(await pages.membership());
    if (route === '#/profile')
        return content.appendChild(await pages.profile());
    if (route === '#/add-client')
        return content.appendChild(await pages.clientForm());
    if (route.includes('#/client/delete/?clientId='))
        return content.appendChild(await pages.clientDelete());
    if (route.includes('#/client/edit/?clientId'))
        return content.appendChild(await pages.clientEdit());
    if (route.includes('#/client/add-payment/?clientId'))
        return content.appendChild(await pages.paymentForm());
    if (route.includes('#/client/payment-history/?clientId'))
        return content.appendChild(await pages.paymentHistory());
    if (route === '#/membership/form')
        return content.appendChild(await pages.membershipForm());
    if (route.includes('#/membership/form/?membershipId='))
        return content.appendChild(await pages.membershipForm());
    if (route === '#/logout')
        return content.appendChild(await pages.logout());
    if (route === '#/300') {
        return content.appendChild( pages.unauthorized());
    }
    if (route === '#/500') {
        return content.appendChild( pages.error500());
    }
    return content.appendChild(pages.notFound());
}

export { router };