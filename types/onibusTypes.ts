export type Onibus = {
    id: string
    nome: string
    cartao: string
    partida: string
    destino: string
    conducao: string
}

export type FormOnibus = {
    nome: string
    cartao: number | string
    conducao: number
}