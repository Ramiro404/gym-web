import { environments } from "../environments";
import { HttpService } from "./http.service";

class BranchOfficeService {
    constructor(){
        this.URL = `${environments.apiUrl}/branchoffices`;
    }

    findOne(id) {
        return HttpService.Get(`${this.URL}/${id}`);
    }

}

const branchOfficeService = new BranchOfficeService();
export { branchOfficeService };