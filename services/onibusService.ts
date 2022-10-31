import { FormOnibus, Onibus } from "../types/onibusTypes";
import api from "./api";

class onibusService {
    endpoint: string

    constructor() {
        this.endpoint = '/onibus'
    }

    async getAllOnibus(): Promise<{
        data: Onibus[];
        error: boolean;
    } | {
        data: null;
        error: unknown;
    }> {
        try {
            const response = await api.get(this.endpoint);
            return {
                data: response.data,
                error: false
            }
        } catch (error) {
            return {
                data: null,
                error
            }
        }
    }

    async getByIdOnibus(id: number | string): Promise<{
        data: Onibus,
        error: boolean
    } | {
        data: null,
        error: unknown
    }> {
        try {
            const response = await api.get(`${this.endpoint}?ID=${id}`);
            return {
                data: response.data[0],
                error: false
            }
        } catch (error) {
            return {
                data: null,
                error
            }
        }
    }

    async getByIdCartao(id: number | string): Promise<{
        data: Onibus,
        error: boolean
    } | {
        data: null,
        error: unknown
    }> {
        try {
            const response = await api.get(`${this.endpoint}?ID_CARTAO=${id}`);
            return {
                data: response.data[0],
                error: false
            }
        } catch (error) {
            return {
                data: null,
                error
            }
        }
    }

    async registerOnibus(data: FormOnibus): Promise<{
        data: null,
        error: boolean
    } | {
        data: null,
        error: unknown
    }> {
        try {
            const response = await api.post(this.endpoint, data);
            return {
                data: response.data,
                error: false
            }
        } catch (error) {
            return {
                data: null,
                error
            }
        }
    }

    async updateOnibus(id: string | number, data: FormOnibus) {
        try {
            console.log(`${this.endpoint}?ID=${id}`);
            const response = await api.put(`${this.endpoint}?ID=${id}`, data);
            return {
                response: response.data,
                error: false
            }
        } catch (error) {
            return {
                response: null,
                error
            }
        }
    }
}

export default new onibusService;