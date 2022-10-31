import { Cartao } from "./cartaoTypes"
import { Recarga } from "./recargaType"
import { Viagem } from "./viagemTypes"

export type Info = {
    cartoes: Cartao[],
    viagens: Viagem[],
    recargas: Recarga[]
}