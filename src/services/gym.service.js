import { environments } from "../environments";
import { HttpService } from "./http.service";

class GymService {
    constructor() {
        this.URL = `${environments.apiUrl}/gyms`;
    }

    findOne(id) {
        return HttpService.Get(`${this.URL}/${id}`);
    }
}

const gymService = new GymService();
export { gymService };