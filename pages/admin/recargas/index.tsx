import { GetServerSidePropsResult } from "next";
import Link from "next/link";
import { useState } from "react";
import LayoutAdmin from "../../../layouts/admin";
import recargaService from "../../../services/recargaService";
import { Recarga } from "../../../types/recargaType";
import { converterFloatParaMoeda } from "../../../utils/conversorMoeda";
import { converterDataDefault } from "../../../utils/converterData";

type Props = {
    data: Recarga[]
}

export default function Recargas({ data }: Props) {
    const [recargas] = useState(data);
    return (
        <LayoutAdmin titleHeader="Recargas">
            <div className="bg-white p-2 rounded-md shadow-md -mt-20">
                <div className="p-10 uppercase">
                    <h1 className="text-2xl font-bold">Lista de recargas</h1>
                </div>
                {!recargas &&
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <strong className="font-bold">Sem recargas cadastradas!</strong>
                        <span className="block sm:inline"></span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                        </span>
                    </div>
                }
                {recargas &&
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="py-3 px-6">Partida</th>
                                <th className="py-3 px-6">Destino</th>
                                <th className="py-3 px-6">Total</th>
                                <th className="py-3 px-6">Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                recargas.map((recarga, index) => {
                                    return (
                                        <tr className="bg-white border-b" key={index}>
                                            <td className="py-4 px-6">{recarga.partida}</td>
                                            <td className="py-4 px-6">{recarga.destino}</td>
                                            <td className="py-4 px-6">{converterFloatParaMoeda(parseFloat(recarga.total))}</td>
                                            <td className="py-4 px-6">{converterDataDefault(recarga.data)}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
            </div>
        </LayoutAdmin>
    )
}

export async function getServerSideProps(ctx: any): Promise<GetServerSidePropsResult<any>> {
    const idCartao = ctx.query.id;

    if (!idCartao) {
        const response = await recargaService.getAllRecargas();
        if (!response.error) {
            return {
                props: {
                    data: response.data ?? []
                }
            }
        } else {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }
    } else {
        const response = await recargaService.getByIdCartao(idCartao);
        if (!response.error) {
            return {
                props: {
                    data: response.data ?? []
                }
            }
        } else {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }
    }
}