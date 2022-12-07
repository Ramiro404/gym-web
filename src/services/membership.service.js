import { environments } from "../environments";
import { HttpService } from "./http.service";

class  MembershipService {
    constructor() {
        this.URL = `${environments.apiUrl}/memberships`;
    }
    findByBranchOffice(id) {
        return HttpService.Get(`${this.URL}/branch-office/${id}`);
    }
    create(data) {
        return HttpService.Post(`${this.URL}`,data);
    }
    update(id, data) {
        return HttpService.Patch(`${this.URL}/${id}`, data);
    }
    findOne(id) {
        return HttpService.Get(`${this.URL}/${id}`);
    }
}

const membershipService = new MembershipService();
export { membershipService }