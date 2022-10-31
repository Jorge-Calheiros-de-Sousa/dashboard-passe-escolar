import { GetStaticPathsResult } from "next";
import { useState } from "react";
import ButtonCadastrarCartao from "../../../../components/forms/buttons/buttonCadastrarCartao";
import InputCadastrarCartao from "../../../../components/forms/inputs/InputCadastrarCartao";
import SelectEditarOnibus from "../../../../components/forms/select/SelectEditarOnibus";
import LayoutAdmin from "../../../../layouts/admin";
import cartaoService from "../../../../services/cartaoService";
import onibusService from "../../../../services/onibusService";
import { Cartao } from "../../../../types/cartaoTypes";
import { Onibus } from "../../../../types/onibusTypes";
import { converterFloatParaMoeda, converterMoedaParaFloat } from "../../../../utils/conversorMoeda";
import { useRouter } from "next/router";

type Props = {
    data: Onibus
    dataCartao: Cartao[]
}

export default function EditarOnibus({ data, dataCartao }: Props) {
    const [onibus] = useState<Onibus>(data);
    const [cartoes] = useState<Cartao[]>(dataCartao);
    const [nome, setNome] = useState(onibus.nome);
    const [cartao, setCartao] = useState(onibus.cartao);
    const [conducao, setConducao] = useState(onibus.conducao);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!nome || !cartao || !conducao) {
            alert("Preecha os campos");
            return;
        }
        const dataOnibus = {
            nome,
            cartao,
            conducao: (conducao.indexOf("R$") != -1 ? converterMoedaParaFloat(conducao) : parseFloat(conducao))
        }

        const response = await onibusService.updateOnibus(onibus.id, dataOnibus);
        if (!response.error) {
            router.back();
        }
    }

    return (
        <LayoutAdmin titleHeader={`${onibus.nome}`}>
            <div className="bg-white rounded-md shadow-md -mt-20">
                <div className="p-10 uppercase">
                    <h1 className="text-2xl font-bold">Editar onibûs</h1>
                </div>
                <div className="p-10 bg-slate-200">
                    <div className={`grid grid-cols-3 gap-5 border-b-2 pb-5 mb-16 border-b-slate-300`}>
                        <div className="col-span-3">
                            <h2 className="uppercase font-bold text-slate-500 text-sm">Informações do cartão</h2>
                        </div>
                        <InputCadastrarCartao label="Linha" value={nome} onChange={(e) => { setNome(e.target.value) }} />
                        <InputCadastrarCartao label="Condução inteira" value={conducao} onChange={(e) => { setConducao(e.target.value) }} placeholder={"00,00 R$"} mask={"99,99 R$"} />
                        <SelectEditarOnibus label="Cartão" disabled={true} options={cartoes} onChange={(e) => { setCartao(e.target.value) }} value={cartao} />
                    </div>
                    <ButtonCadastrarCartao onClick={() => { handleSubmit() }}>
                        Salvar alterações
                    </ButtonCadastrarCartao>
                    <div className="mt-10">
                        <strong className="text-red-700">* Obrigatório</strong>
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    )
}

export async function getStaticPaths(): Promise<GetStaticPathsResult<any>> {
    const response = await onibusService.getAllOnibus();
    if (!response.error && response.data) {
        const paths = response.data.map((onibus) => ({
            params: { id: onibus.id }
        }))
        return {
            paths,
            fallback: 'blocking'
        }
    }
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export async function getStaticProps(ctx: any) {
    const id = ctx.params.id;
    const response = await onibusService.getByIdOnibus(id);
    const responseCartao = await cartaoService.getAllCartoes();

    if (!response.error && response.data && !responseCartao.error) {
        return {
            props: {
                data: response.data,
                dataCartao: responseCartao.data
            },
            revalidate: 10,
        }
    }
    return {
        redirect: {
            destination: '/admin/onibus',
            permanent: false
        }
    }
}