import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import Link from "next/link";
import { cloneElement, useEffect, useState } from "react";
import { BsTrash, BsCardText, BsPen } from "react-icons/bs";
import ButtonCadastrarCartao from "../../../components/forms/buttons/buttonCadastrarCartao";
import ButtonCadastrarViagem from "../../../components/forms/buttons/buttonCadastrarViagem";
import InputCadastrarCartao from "../../../components/forms/inputs/InputCadastrarCartao";
import InputCadastrarViagem from "../../../components/forms/inputs/InputCadastrarViagem";
import SelectCadastroViagem from "../../../components/forms/select/SelectCadastroViagem";
import LayoutAdmin from "../../../layouts/admin";
import cartaoService from "../../../services/cartaoService";
import recargaService from "../../../services/recargaService";
import viagemService from "../../../services/viagemService";
import { Cartao } from "../../../types/cartaoTypes";
import { Recarga } from "../../../types/recargaType";
import { Viagem } from "../../../types/viagemTypes";
import { converterFloatParaMoeda, converterMoedaParaFloat } from "../../../utils/conversorMoeda";
import { useRouter } from "next/router";
import onibusService from "../../../services/onibusService";

type OnibusToListCreate = {
    idTemp: number
    nome: string
    conducao: string
    deleted?: boolean
}

type Props = {
    data: Cartao
    dataViagem: Viagem[]
    dataRecarga: Recarga[]
}


export default function CartaoById({ data, dataViagem, dataRecarga }: Props) {
    const [cartao] = useState<Cartao>(data);
    const [partida, setPartida] = useState(cartao.partida);
    const [destino, setDestino] = useState(cartao.destino);
    const [credito, setCredito] = useState(cartao.credito);
    const [linha, setLinha] = useState("");
    const [conducao, setConducao] = useState("");
    const [onibusCadastro, setOnibusCadastro] = useState<OnibusToListCreate[]>([]);
    const [quantViagem] = useState(dataViagem.length);
    const [quantRecarga] = useState(dataRecarga.length);
    const [quantOnibus] = useState(cartao.onibus.length);
    const [formFirts, setFormFirst] = useState(true);
    const [formSecond, setFormSecond] = useState(false);
    const [dateViagem, setDateViagem] = useState("");
    const [dateRecarga, setDateRecarga] = useState("");
    const [totalRecarga, setTotalRecarga] = useState("");
    const [linhaViagem, setLinhaViagem] = useState(0);

    const router = useRouter();

    useEffect(() => {
        const fetchData = () => {
            const cloneOnibusCadastro = [...onibusCadastro];
            const onibus = cartao.onibus;
            onibus.map(onibus => {
                const exists = cloneOnibusCadastro.filter(clone => clone.idTemp == parseInt(onibus.id));
                if (exists.length) {
                    return;
                } else {
                    const newOnibusCadastro: OnibusToListCreate = {
                        idTemp: parseInt(onibus.id),
                        nome: onibus.nome,
                        conducao: onibus.conducao,
                        deleted: false
                    }
                    cloneOnibusCadastro.push(newOnibusCadastro);
                }
            });
            setOnibusCadastro(cloneOnibusCadastro);
        }
        fetchData();
    }, [])

    const handleChangeFormsFirt = () => {
        setFormSecond(false);
        setFormFirst(true);
    }
    const handleChangeFormSecond = () => {
        setFormFirst(false);
        setFormSecond(true);
    }

    const handleAddOninus = () => {
        if (!linha || !conducao) {
            alert("Preencha os campos");
            return;
        }
        const arrayOnibusListClone = [...onibusCadastro];
        const dataToList: OnibusToListCreate = {
            idTemp: arrayOnibusListClone.length,
            nome: linha,
            conducao: converterMoedaParaFloat(conducao),
            deleted: true
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
            credito: parseFloat(credito)
        }
        const onibusCadastrosOnlyToCreate = onibusCadastro.filter(onibus => onibus.deleted == true);
        const responseCartao = await cartaoService.updateCartao(cartao.id, dataCartao);
        if (!responseCartao.error) {
            const id = cartao.id;
            await onibusCadastrosOnlyToCreate.map(onibus => {
                const dataOnibus = {
                    nome: onibus.nome,
                    cartao: id,
                    conducao: parseFloat(onibus.conducao)
                }
                onibusService.registerOnibus(dataOnibus);
            })
            router.reload();
        }

    }

    const handleSubmitViagem = async () => {
        if (!linhaViagem || !dateViagem) {
            alert("Preencha os campos");
            return;
        }

        const dataViagem = {
            cartao: cartao.id,
            onibus: linhaViagem,
            data: dateViagem
        }

        const response = await viagemService.registerViagem(dataViagem);

        if (!response.error) {
            router.reload();
        }
    }

    const handleSubmitRecarga = async () => {
        if (!totalRecarga || !dateRecarga) {
            alert("Preencha os campos");
            return;
        }

        const dataRecarga = {
            cartao: cartao.id,
            total: converterMoedaParaFloat(totalRecarga),
            data: dateRecarga
        }

        const response = await recargaService.registerRecarga(dataRecarga);

        if (!response.error) {
            router.reload();
        }
    }
    return (
        <LayoutAdmin titleHeader={`${cartao.partida} - ${cartao.destino}`}>
            <div className="-mt-20 grid grid-cols-3 gap-10 justify-center items-start">
                <div className="bg-white rounded-md col-span-2 shadow-md">
                    <div className="p-10 uppercase">
                        <h1 className="text-2xl font-bold">Configurações do cartão</h1>
                    </div>
                    <div className="p-10 bg-slate-200">
                        <div className={`grid grid-cols-3 gap-5 border-b-2 pb-5 mb-16 border-b-slate-300`}>
                            <div className="col-span-3">
                                <h2 className="uppercase font-bold text-slate-500 text-sm">Informações do cartão</h2>
                            </div>
                            <InputCadastrarCartao label="Partida" value={partida} onChange={(e) => { setPartida(e.target.value) }} />
                            <InputCadastrarCartao label="Destino" value={destino} onChange={(e) => { setDestino(e.target.value) }} />
                            <InputCadastrarCartao label="Crédito" mask="999,99 R$" placeholder="000,00 R$" disabled={true} value={credito} onChange={(e) => { setCredito(e.target.value) }} />
                        </div>
                        <div className={`grid grid-cols-3 gap-5 justify-center items-end border-b-2 mb-5`}>
                            <div className="col-span-3">
                                <h2 className="uppercase font-bold text-slate-500 text-sm">Informações dos onibûs</h2>
                                <p className="text-slate-400 uppercase font-bold text-xs mt-2">Cadastre os onibûs que é possivel pegar com o cartão</p>
                            </div>
                            <InputCadastrarCartao requiredInput={false} label="Linha" value={linha} onChange={(e) => { setLinha(e.target.value) }} />
                            <InputCadastrarCartao requiredInput={false} label="Condução" value={conducao} mask="99,99 R$" placeholder="00,00 R$" onChange={(e) => { setConducao(e.target.value) }} />
                            <button onClick={() => { handleAddOninus() }} className="w-fit py-2 px-6 bg-blue-700 rounded-md font-bold text-white h-fit">
                                Adicionar <strong>+</strong>
                            </button>
                            <div className="col-span-3 bg-white p-5 rounded-md shadow-md h-52 overflow-auto">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th className="py-3 px-6">Linha</th>
                                            <th className="py-3 px-6">Condução metade</th>
                                            <th className="py-3 px-6">Condução inteira</th>
                                            <th className="py-3 px-6">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {onibusCadastro.map((onibus, index) => {
                                            return (
                                                <tr className="bg-white border-b" key={index}>
                                                    <td className="py-4 px-6">{onibus.nome}</td>
                                                    <td className="py-4 px-6">{converterFloatParaMoeda(parseFloat(onibus.conducao) / 2)}</td>
                                                    <td className="py-4 px-6">{converterFloatParaMoeda(parseFloat(onibus.conducao))}</td>
                                                    <td className="py-4 px-6">
                                                        {onibus.deleted ?
                                                            <button onClick={() => { handleRemoveOnibus(onibus.idTemp) }} className="bg-red-600 font-bold flex text-white p-2 rounded-md shadow-lg hover:bg-red-800 transition-all">
                                                                Excluir <BsTrash size={20} className={'ml-2'} />
                                                            </button>
                                                            :
                                                            <Link href={`/admin/onibus/editar/${onibus.idTemp}`}>
                                                                <div className="bg-blue-600 cursor-pointer w-fit font-bold flex text-white p-2 rounded-md shadow-lg hover:bg-blue-800 transition-all">
                                                                    Alterar <BsPen size={20} className={'ml-2'} />
                                                                </div>
                                                            </Link>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <ButtonCadastrarCartao onClick={() => { handleSubmit() }}>
                            Salvar alterações
                        </ButtonCadastrarCartao>
                        <div className="mt-10">
                            <strong className="text-red-700">* Obrigatório</strong>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center flex-col items-center bg-white rounded-md">
                    <div className="bg-blue-400 -mt-10 text-white rounded-full w-fit h-fit p-7">
                        <BsCardText size={70} />
                    </div>
                    <div className="flex mt-2">
                        <div className="text-center">
                            <span className="font-bold text-slate-600">{quantViagem}</span>
                            <div className="text-xs text-slate-400">Viagens</div>
                        </div>
                        <div className="text-center mx-2">
                            <span className="font-bold text-slate-600">{quantOnibus}</span>
                            <div className="text-xs text-slate-400">Onibus</div>
                        </div>
                        <div className="text-center">
                            <span className="font-bold text-slate-600">{quantRecarga}</span>
                            <div className="text-xs text-slate-400">Recargas</div>
                        </div>
                    </div>
                    <div className="bg-white p-5 text-center font-bold rounded-md shadow-lg w-full mt-10">
                        <h1 className="text-lg text-slate-700">{cartao.partida} - {cartao.destino}</h1>
                        <h1 className="text-lg text-slate-800 mt-6">{converterFloatParaMoeda(parseFloat(cartao.credito))}</h1>
                        <div className="flex justify-around mt-10">
                            <button onClick={() => { handleChangeFormsFirt() }} className="w-fit h-fit py-2 px-3 bg-gray-500 hover:bg-gray-700 transition-all text-white rounded-md">
                                Viagem
                            </button>
                            <button onClick={() => { handleChangeFormSecond() }} className="w-fit h-fit py-2 px-3 bg-gray-500 hover:bg-gray-700 transition-all text-white rounded-md">
                                Recarga
                            </button>
                        </div>
                        {formFirts &&
                            <div className="mt-5 bg-slate-200 text-left rounded-md p-5">
                                <h1 className="uppercase text-slate-700 mb-5">Registrar uma viagem</h1>
                                <SelectCadastroViagem label="Linha" options={cartao.onibus} onChange={(e) => { setLinhaViagem(e.target.value) }} value={linhaViagem} />
                                <InputCadastrarViagem label="Data" type={"date"} requiredInput={false} onChange={(e) => { setDateViagem(e.target.value) }} value={dateViagem} />
                                <div className="mt-5 col-span-2">
                                    <ButtonCadastrarViagem onClick={() => { handleSubmitViagem() }}>
                                        Registrar viagem
                                    </ButtonCadastrarViagem>
                                </div>
                            </div>
                        }
                        {formSecond &&
                            <div className="mt-5 bg-slate-200 text-left rounded-md p-5">
                                <h1 className="uppercase text-slate-700 mb-5">Registrar uma recarga</h1>
                                <InputCadastrarViagem label="Total" mask="999,99 R$" requiredInput={false} placeholder={'000,00 R$'} onChange={(e) => { setTotalRecarga(e.target.value) }} />
                                <InputCadastrarViagem label="Data" type={"date"} requiredInput={false} onChange={(e) => { setDateRecarga(e.target.value) }} />
                                <div className="mt-5 col-span-2">
                                    <ButtonCadastrarViagem onClick={() => { handleSubmitRecarga() }}>
                                        Registrar recarga
                                    </ButtonCadastrarViagem>
                                </div>
                            </div>
                        }
                        <h1 className="text-lg text-slate-700 mt-20">Onibûs</h1>
                        <div className="m-2">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="py-3 px-6">Linha</th>
                                        <th className="py-3 px-6">Condução metade</th>
                                        <th className="py-3 px-6">Condução inteira</th>
                                        <th className="py-3 px-6">Viagens restantes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartao.onibus.map((onibus, index) => {
                                        return (
                                            <tr className="bg-white border-b" key={index}>
                                                <td className="py-4 px-6">{onibus.nome}</td>
                                                <td className="py-4 px-6">{converterFloatParaMoeda(parseFloat(onibus.conducao) / 2)}</td>
                                                <td className="py-4 px-6">{converterFloatParaMoeda(parseFloat(onibus.conducao))}</td>
                                                <td className="py-4 px-6">
                                                    {(parseFloat(cartao.credito) / (parseFloat(onibus.conducao) / 2)).toFixed(0)}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    )
}

export async function getStaticProps(ctx: any): Promise<GetStaticPropsResult<any>> {
    const id = ctx.params.id;
    const response = await cartaoService.getByIdCartao(id);
    const viagemResponse = await viagemService.getByIdCartao(id);
    const recargaResponse = await recargaService.getByIdCartao(id);
    if (!response.error && response.data) {
        return {
            props: {
                data: response.data,
                dataViagem: viagemResponse.data ? viagemResponse.data : [],
                dataRecarga: recargaResponse.data ? recargaResponse.data : []
            },
            revalidate: 10
        }
    }
    return {
        redirect: {
            destination: '/admin/cartao',
            permanent: false
        }
    }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult<any>> {
    const response = await cartaoService.getAllCartoes();
    if (!response.error && response.data) {
        const paths = response.data.map((cartao) => ({
            params: { id: cartao.id }
        }))
        return {
            paths,
            fallback: 'blocking',
        }
    }
    return {
        paths: [],
        fallback: 'blocking'
    }
}