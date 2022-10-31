import { FormViagem } from '../types/viagemTypes';
import { Viagem } from "../types/viagemTypes";
import api from "./api";

class viagemService {
    endpoint: string

    constructor() {
        this.endpoint = '/viagem'
    }

    async getAllViagem(): Promise<{
        data: Viagem[];
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

    async getByIdViagem(id: number | string): Promise<{
        data: Viagem,
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
        data: Viagem[],
        error: boolean
    } | {
        data: null,
        error: unknown
    }> {
        try {
            const response = await api.get(`${this.endpoint}?ID_CARTAO=${id}`);
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

    async registerViagem(data: FormViagem): Promise<{
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

    async updateViagem(id: string | number, data: FormViagem) {
        try {
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

export default new viagemService;