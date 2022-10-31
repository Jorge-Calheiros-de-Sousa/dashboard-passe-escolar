import { useState } from "react";
import ButtonCadastrarCartao from "../../../components/forms/buttons/buttonCadastrarCartao";
import InputCadastrarCartao from "../../../components/forms/inputs/InputCadastrarCartao";
import LayoutAdmin from "../../../layouts/admin";
import { BsTrash } from "react-icons/bs";
import { converterMoedaParaFloat } from "../../../utils/conversorMoeda";
import cartaoService from "../../../services/cartaoService";
import onibusService from "../../../services/onibusService";
import { useRouter } from "next/router";

type OnibusToListCreate = {
    idTemp: number
    nome: string
    conducao: number
}

export default function Cadastrar() {
    const [partida, setPartida] = useState("");
    const [destino, setDestino] = useState("");
    const [credito, setCredito] = useState("00000");
    const [linha, setLinha] = useState("");
    const [conducao, setConducao] = useState("");
    const [onibusCadastro, setOnibusCadastro] = useState<OnibusToListCreate[]>([]);
    const router = useRouter();

    const handleAddOninus = () => {
        if (!linha || !conducao) {
            alert("Preencha os campos");
            return;
        }
        const arrayOnibusListClone = [...onibusCadastro];
        const dataToList: OnibusToListCreate = {
            idTemp: arrayOnibusListClone.length,
            nome: linha,
            conducao: converterMoedaParaFloat(conducao)
        }
        arrayOnibusListClone.push(dataToList);
        setOnibusCadastro(arrayOnibusListClone);
        setLinha("");
        setConducao("");
    }

    const handleRemoveOnibus = (idTemp: number) => {
        const arrayOnibusListClone = [...onibusCadastro];
        const indexDelete = arrayOnibusListClone.findIndex(onibus => onibus.idTemp == idTemp);
        arrayOnibusListClone.splice(indexDelete, 1);
        setOnibusCadastro(arrayOnibusListClone);
    }

    const handleSubmit = async () => {
        if (!partida || !destino || !credito) {
            alert("Preencha os campos");
            return;
        }
        const dataCartao = {
            partida,
            destino,
            credito: converterMoedaParaFloat(credito)
        }

        const responseCartao = await cartaoService.registerCartao(dataCartao);

        if (!responseCartao.error && responseCartao.data) {
            const id = responseCartao.data.id;
            await onibusCadastro.map(onibus => {
                const dataOnibus = {
                    nome: onibus.nome,
                    cartao: id,
                    conducao: onibus.conducao
                }
                onibusService.registerOnibus(dataOnibus);
            })
            router.replace(`/admin/cartao/${id}`);
        }
    }

    return (
        <LayoutAdmin titleHeader="Cadastrar cartão">
            <div className="bg-white rounded-md shadow-md -mt-20">
                <div className="p-10 uppercase">
                    <h1 className="text-2xl font-bold">Cadastrar cartão</h1>
                </div>
                <div className="p-10 bg-slate-200">
                    <div className={`grid grid-cols-3 gap-5 border-b-2 pb-5 mb-16 border-b-slate-300`}>
                        <div className="col-span-3">
                            <h2 className="uppercase font-bold text-slate-500 text-sm">Informações do cartão</h2>
                        </div>
                        <InputCadastrarCartao label="Partida" value={partida} onChange={(e) => { setPartida(e.target.value) }} />
                        <InputCadastrarCartao label="Destino" value={destino} onChange={(e) => { setDestino(e.target.value) }} />
                        <InputCadastrarCartao label="Crédito" disabled={true} mask="999,99 R$" placeholder="000,00 R$" value={credito} onChange={(e) => { setCredito(e.target.value) }} />
                    </div>
                    <div className={`grid grid-cols-3 gap-5 justify-center items-end border-b-2 mb-5`}>
                        <div className="col-span-3">
                            <h2 className="uppercase font-bold text-slate-500 text-sm">Informações dos onibûs</h2>
                            <p className="text-slate-400 uppercase font-bold text-xs mt-2">Cadastre os onibûs que é possivel pegar com o cartão</p>
                        </div>
                        <InputCadastrarCartao requiredInput={false} label="Linha" value={linha} onChange={(e) => { setLinha(e.target.value) }} />
                        <InputCadastrarCartao requiredInput={false} label="Condução" value={conducao} mask={'99,99 R$'} placeholder="00,00 R$" onChange={(e) => { setConducao(e.target.value) }} />
                        <button onClick={() => { handleAddOninus() }} className="w-fit py-2 px-6 bg-blue-700 rounded-md font-bold text-white h-fit">
                            Adicionar <strong>+</strong>
                        </button>
                        <div className="col-span-3 bg-white p-5 rounded-md shadow-md h-52 overflow-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="py-3 px-6">Linha</th>
                                        <th className="py-3 px-6">Condução</th>
                                        <th className="py-3 px-6">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {onibusCadastro.map((onibus, index) => {
                                        return (
                                            <tr className="bg-white border-b" key={index}>
                                                <td className="py-4 px-6">{onibus.nome}</td>
                                                <td className="py-4 px-6">{onibus.conducao} R$</td>
                                                <td className="py-4 px-6">
                                                    <button onClick={() => { handleRemoveOnibus(onibus.idTemp) }} className="bg-red-600 font-bold flex text-white p-2 rounded-md shadow-lg hover:bg-red-800 transition-all">
                                                        Excluir <BsTrash size={20} className={'ml-2'} />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <ButtonCadastrarCartao onClick={() => { handleSubmit() }}>
                        Cadastrar
                    </ButtonCadastrarCartao>
                    <div className="mt-10">
                        <strong className="text-red-700">* Obrigatório</strong>
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    )
}

export function getStaticProps() {
    return {
        props: {},
    }
}