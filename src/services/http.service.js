class HttpService {
    static Get(url) {
        return fetch(url);
    }

    static Post(url, data) {
        return fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json', },
            body: JSON.stringify(data),
        });
    }

    static Patch(url, data) {
        return  fetch(url, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json', },
            body: JSON.stringify(data),
        });
    }

    static Delete(url) {
        return  fetch(url, {
            method: 'DELETE',
        })
    }
}
export { HttpService };