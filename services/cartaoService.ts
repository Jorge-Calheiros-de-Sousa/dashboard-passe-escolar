import { Cartao, FormCartao } from "../types/cartaoTypes";
import api from "./api";

class cartaoService {
    endpoint: string

    constructor() {
        this.endpoint = '/cartao'
    }

    async getAllCartoes(): Promise<{
        data: Cartao[];
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

    async getByIdCartao(id: number | string): Promise<{
        data: Cartao,
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

    async registerCartao(data: FormCartao): Promise<{
        data: Cartao,
        error: boolean
    } | {
        data: null,
        error: unknown
    }> {
        try {
            const response = await api.post(this.endpoint, data);
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

    async updateCartao(id: string | number, data: FormCartao) {
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

export default new cartaoService;