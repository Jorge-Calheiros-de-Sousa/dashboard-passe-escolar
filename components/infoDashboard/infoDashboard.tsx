import axios from "axios";
import { BsCashCoin } from "react-icons/bs";
import { Info } from "../../types/infoType";
import useSWR from 'swr';
import { converterFloatParaMoeda } from "../../utils/conversorMoeda";

type Props = {
    info: Info
}

const fetcher = (url: string) => axios.get<Info>(url);

export default function InfoDashBoard() {
    const { data, error } = useSWR('http://localhost:3000/api/info', fetcher);
    const messageGeneric = 'Carregando...';
    let cartaoGastoTotal = 0
    let viagemGastoTotal = 0;
    let recargaGastoTotal = 0;
    const totalCartao = data?.data.cartoes.length;
    const totalViagem = data?.data.viagens.length;
    const totalRecarga = data?.data.recargas.length;
    if (data) {
        if (data.data.cartoes) {
            data.data.cartoes.map(cartao => cartaoGastoTotal = cartaoGastoTotal + parseFloat(cartao.credito));
        }
        if (data.data.viagens) {
            data.data.viagens.map(viagem => viagemGastoTotal = viagemGastoTotal + (parseFloat(viagem.conducao) / 2));
        }
        if (data.data.recargas) {
            data.data.recargas.map(recarga => recargaGastoTotal = recargaGastoTotal + parseFloat(recarga.total));
        }
    }
    return (
        <div className="flex justify-between items-center mt-20">
            <div className="w-96  p-5 rounded-md shadow-md bg-white">
                <p className="uppercase font-bold text-xs text-slate-500">Viagens</p>
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-lg text-gray-800">{viagemGastoTotal != null ? converterFloatParaMoeda(viagemGastoTotal) : messageGeneric}</h1>
                    <div className="w-fit rounded-full shadow-lg bg-green-500 p-2">
                        <BsCashCoin size={30} className={'text-white'} />
                    </div>
                </div>
                <span className="text-xs text-slate-400 font-bold">Total de viagens feitas: {totalViagem ?? messageGeneric}</span>
            </div>
            <div className="w-96  p-5 rounded-md shadow-md bg-white">
                <p className="uppercase font-bold text-xs text-slate-500">Recargas</p>
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-lg text-gray-800">{recargaGastoTotal != null ? converterFloatParaMoeda(recargaGastoTotal) : messageGeneric}</h1>
                    <div className="w-fit rounded-full shadow-lg bg-green-500 p-2">
                        <BsCashCoin size={30} className={'text-white'} />
                    </div>
                </div>
                <span className="text-xs text-slate-400 font-bold">Total de recargas feitas: {totalRecarga ?? messageGeneric}</span>
            </div>
            <div className="w-96  p-5 rounded-md shadow-md bg-white">
                <p className="uppercase font-bold text-xs text-slate-500">Cartões</p>
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-lg text-gray-800">{cartaoGastoTotal != null ? converterFloatParaMoeda(cartaoGastoTotal) : messageGeneric}</h1>
                    <div className="w-fit rounded-full shadow-lg bg-green-500 p-2">
                        <BsCashCoin size={30} className={'text-white'} />
                    </div>
                </div>
                <span className="text-xs text-slate-400 font-bold">Total de cartões cadastrados: {totalCartao ?? messageGeneric}</span>
            </div>

        </div>
    )
}