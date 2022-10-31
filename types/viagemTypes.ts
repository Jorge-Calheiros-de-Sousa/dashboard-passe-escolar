export type Viagem = {
    id: string
    nome: string
    partida: string
    destino: string
    conducao: string
    data: string
}

export type FormViagem = {
    cartao: number | string
    onibus: number
    data: string
}