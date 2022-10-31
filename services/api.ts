import axios, { AxiosInstance } from "axios";

class Api {
    httpClient: AxiosInstance

    constructor() {
        this.httpClient = axios.create({
            baseURL: 'http://localhost:8001/api'
        })
    }

    get(endpoint: string) {
        return this.httpClient.get(endpoint);
    }

    post(endpoint: string, data: Object) {
        return this.httpClient.post(endpoint, data);
    }

    put(endpoint: string, data: Object) {
        return this.httpClient.put(endpoint, data);
    }

    delete(endpoint: string, data: Object) {
        return this.httpClient.delete(endpoint, data);
    }
}

export default new Api;