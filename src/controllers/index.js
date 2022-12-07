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
import Logout from './logout.controller';
import Unauthorized from './unauthorized.controller'
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
    logout: Logout,
    unauthorized: Unauthorized
};

export {pages};