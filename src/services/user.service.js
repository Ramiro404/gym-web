import { environments } from "../environments";
import { HttpService } from "./http.service";
class UserService {
    constructor(){
        this.URL = `${environments.apiUrl}/users`;
    }
    findOne(id) {
        return HttpService.Get(`${this.URL}/${id}`);
    }
}
const userService = new UserService();
export {userService};