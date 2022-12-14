import Login from './login.controller'
import Home from './home.controller';
import Client from './client.controller';
import Membership from './membership.controller'
import Profile from './profile.controller';
import ClientForm from './client-form.controller';
import ClientEdit from './client-edit.controller';
import PaymentForm from './payment-form.controller';
import PaymentHistory from './payment-history.controller';
import MembershipForm from './membership-form.controller';
import ClientDelete from './client-delete.controller';
import Error500 from './error-500.controller';
import Logout from './logout.controller';
import Unauthorized from './unauthorized.controller';
import NotFound from './not-found.controller';
const pages = {
    home: Home,
    login: Login,
    client: Client,
    membership: Membership,
    profile: Profile,
    clientForm: ClientForm,
    clientEdit: ClientEdit,
    paymentForm: PaymentForm,
    paymentHistory: PaymentHistory,
    membershipForm: MembershipForm,
    clientDelete: ClientDelete,
    logout: Logout,
    unauthorized: Unauthorized,
    notFound: NotFound,
    error500: Error500
};

export {pages};