import { environments } from "../environments";
import { HttpService } from "./http.service";

class ClientService {
    constructor() {
        this.URL = `${environments.apiUrl}/clients`;
    }
    findAll() {
        return HttpService.Get(this.URL);
    }
    findByBranchOffice(id, order = 'last_payment', active = false ) {
        return HttpService.Get(`${this.URL}/branch-office/${id}?order=${order}&active=${active}`)
    }
    save(data) {
        return HttpService.Post(`${this.URL}`, data);
    }
    findOne(id) {
        return HttpService.Get(`${this.URL}/${id}`);
    }
    update(id, data) {
        return HttpService.Patch(`${this.URL}/${id}`, data);
    }
    getLastPayment(id) {
        return HttpService.Get(`${this.URL}/membership/${id}`);
    }
    addPayment(data) {
        return HttpService.Post(`${this.URL}/add-payment`,data);
    }
    getPaymentHistory(id){
        return HttpService.Get(`${this.URL}/payment/${id}`);
    }
    delete(id) {
        return HttpService.Delete(`${this.URL}/${id}`);
    }
}
const clientService = new ClientService();
export { clientService };