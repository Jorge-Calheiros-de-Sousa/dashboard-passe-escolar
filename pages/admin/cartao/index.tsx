import { GetStaticPropsResult } from "next";
import Link from "next/link";
import { useState } from "react";
import LayoutAdmin from "../../../layouts/admin";
import cartaoService from "../../../services/cartaoService";
import { Cartao } from "../../../types/cartaoTypes";
import { converterFloatParaMoeda } from "../../../utils/conversorMoeda";

type Props = {
    data: Cartao[]
}

export default function ListarCartoes({ data }: Props) {
    const [cartoes] = useState<Cartao[]>(data);
    const [totalCartoes] = useState(cartoes.length);
    return (
        <LayoutAdmin titleHeader="Listar cartões">
            <div className="bg-white rounded-md shadow-md -mt-20">
                <div className="p-10 uppercase">
                    <h1 className="text-2xl mb-5 font-bold">Meus cartões</h1>
                    <strong>Total de cartões: </strong><span>{totalCartoes}</span>
                </div>
                {!cartoes &&
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <strong className="font-bold">Sem cartões cadastrados!</strong>
                        <span className="block sm:inline"></span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                        </span>
                    </div>
                }
                {cartoes &&
                    <div className="p-10 grid grid-cols-3 gap-5 bg-slate-200">
                        {
                            cartoes.map((cartao, index) => {
                                const dinheiroConvertido = converterFloatParaMoeda(parseFloat(cartao.credito));
                                return (
                                    <div key={index} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{cartao.partida} - {cartao.destino}</h5>
                                        <p className="font-normal text-gray-700 dark:text-gray-400 uppercase mb-5">Crédito total: <strong>{dinheiroConvertido}</strong></p>
                                        <Link href={`/admin/cartao/${cartao.id}`}>
                                            <div className="inline-flex cursor-pointer items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                Detalhes
                                                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                }

            </div>
        </LayoutAdmin>
    )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<any>> {
    const response = await cartaoService.getAllCartoes();

    return {
        props: {
            data: response.data
        },
        revalidate: 10
    }
}