import { GetStaticPropsResult } from "next";
import Link from "next/link";
import { useState } from "react";
import LayoutAdmin from "../../../layouts/admin";
import onibusService from "../../../services/onibusService";
import { Onibus } from "../../../types/onibusTypes";
import { converterFloatParaMoeda } from "../../../utils/conversorMoeda";

type Props = {
    data: Onibus[];
}

export default function ListarOnibus({ data }: Props) {
    const [onibus] = useState<Onibus[]>(data);

    return (
        <LayoutAdmin titleHeader="Listar onibûs">
            <div className="bg-white p-2 rounded-md shadow-md -mt-20">
                <div className="p-10 uppercase">
                    <h1 className="text-2xl font-bold">Lista de onibûs</h1>
                </div>
                {
                    !onibus &&
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <strong className="font-bold">Sem onibûs cadastrados!</strong>
                        <span className="block sm:inline"></span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                        </span>
                    </div>
                }
                {onibus &&
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="py-3 px-6">Linha</th>
                                <th className="py-3 px-6">Condução metade</th>
                                <th className="py-3 px-6">Condução inteira</th>
                                <th className="py-3 px-6">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                onibus.map((onibus, index) => {
                                    return (
                                        <tr className="bg-white border-b" key={index}>
                                            <td className="py-4 px-6">{onibus.nome}</td>
                                            <td className="py-4 px-6">{converterFloatParaMoeda(parseFloat(onibus.conducao) / 2)}</td>
                                            <td className="py-4 px-6">{converterFloatParaMoeda(parseFloat(onibus.conducao))}</td>
                                            <td className="py-4 px-6">
                                                <Link href={`/admin/onibus/editar/${onibus.id}`}>
                                                    <div className="w-fit h-fit px-3 py-2 bg-blue-700 text-white rounded-md font-bold cursor-pointer">
                                                        Editar
                                                    </div>
                                                </Link>
                                            </td>
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

export async function getServerSideProps(ctx: any): Promise<GetStaticPropsResult<any>> {
    const idCartao = ctx.query.id;

    if (!idCartao) {
        const response = await onibusService.getAllOnibus();
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
        const response = await onibusService.getByIdCartao(idCartao);
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