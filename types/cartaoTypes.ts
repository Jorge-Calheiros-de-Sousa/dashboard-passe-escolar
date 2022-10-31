import { Onibus } from "./onibusTypes"

export type Cartao = {
    id: string
    partida: string
    destino: string
    credito: string
    onibus: Onibus[]
}

export type FormCartao = {
    partida: string
    destino: string
    credito: number
}