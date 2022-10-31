import api from "./api";
import { FormRecarga, Recarga } from '../types/recargaType';

class recargaService {
    endpoint: string

    constructor() {
        this.endpoint = '/recarga'
    }

    async getAllRecargas(): Promise<{
        data: Recarga[];
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

    async getByIdRecarga(id: number | string): Promise<{
        data: Recarga,
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
        data: Recarga[],
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

    async registerRecarga(data: FormRecarga): Promise<{
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

    async updateRecarga(id: string | number, data: FormRecarga) {
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

export default new recargaService;