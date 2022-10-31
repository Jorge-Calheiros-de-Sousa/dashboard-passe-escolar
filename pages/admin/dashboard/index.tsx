import LayoutAdmin from "../../../layouts/admin";
import { Chart } from "react-google-charts";
import viagemService from "../../../services/viagemService";
import { GetStaticPropsResult } from "next";
import { Viagem } from "../../../types/viagemTypes";
import { useEffect, useState } from "react";
import recargaService from "../../../services/recargaService";
import { Recarga } from "../../../types/recargaType";
import cartaoService from "../../../services/cartaoService";
import { Cartao } from "../../../types/cartaoTypes";

type Props = {
    data: Viagem[]
    dataRecarga: Recarga[]
    dataCartao: Cartao[]
}

export default function Dashboard({ data, dataRecarga, dataCartao }: Props) {
    const [viagens] = useState<Viagem[]>(data);
    const [recargas] = useState<Recarga[]>(dataRecarga);
    const [cartoes] = useState<Cartao[]>(dataCartao);
    const [yearDefault] = useState(2022);
    const [cartoesFiltrados, setCartoesFiltrados] = useState<any[]>([
        ['Cartões', 'Crédito']
    ])
    const [viagensFiltradas, setViagemsFiltradas] = useState<any[]>([
        ['Mêses', 'Gasto com viagens', 'Total de viagens feitas'],
        ['Janeiro', 0, 0],
        ['Fevereiro', 0, 0],
        ['Março', 0, 0],
        ['Abril', 0, 0],
        ['Maio', 0, 0],
        ['Junho', 0, 0],
        ['Julho', 0, 0],
        ['Agosto', 0, 0],
        ['Setembro', 0, 0],
        ['Outubro', 0, 0],
        ['Novembro', 0, 0],
        ['Dezembro', 0, 0],
    ]);
    const [recargasFiltradas, setRecargasFiltradas] = useState<any[]>([
        ['Mêses', 'Gasto com recarga'],
        ['Janeiro', 0],
        ['Fevereiro', 0],
        ['Março', 0],
        ['Abril', 0],
        ['Maio', 0],
        ['Junho', 0],
        ['Julho', 0],
        ['Agosto', 0],
        ['Setembro', 0],
        ['Outubro', 0],
        ['Novembro', 0],
        ['Dezembro', 0],
    ])

    useEffect(() => {
        const fetchFiltro = () => {
            viagens.map(viagem => {
                const newData = new Date(viagem.data);
                const mouth = newData.getMonth() + 1;
                const year = newData.getFullYear();
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num, index) => {
                    if (mouth == num && year == yearDefault) {
                        const cloneViagensFiltradas = [...viagensFiltradas];
                        cloneViagensFiltradas[index + 1][2] = cloneViagensFiltradas[index + 1][2] + 1;
                        cloneViagensFiltradas[index + 1][1] = cloneViagensFiltradas[index + 1][1] + parseFloat(viagem.conducao) / 2;
                        setViagemsFiltradas(cloneViagensFiltradas);
                    }
                })
            })
        }
        fetchFiltro();
    }, [viagens]);
    useEffect(() => {
        const fetchFiltro = () => {
            if (recargas.length) {
                recargas.map(recarga => {
                    const newData = new Date(recarga.data);
                    const mouth = newData.getMonth() + 1;
                    const year = newData.getFullYear();
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num, index) => {
                        if (mouth == num && year == yearDefault) {
                            const cloneRecargasFiltradas = [...recargasFiltradas];
                            cloneRecargasFiltradas[index + 1][1] = cloneRecargasFiltradas[index + 1][1] + parseFloat(recarga.total);
                            setRecargasFiltradas(cloneRecargasFiltradas);
                        }
                    })
                })
            }
        }
        fetchFiltro();
    }, [recargas]);
    useEffect(() => {
        const fetchFiltro = () => {
            if (cartoes.length) {
                const cloneCartoesFiltrados = [...cartoesFiltrados];
                cartoes.map(cartao => {
                    cloneCartoesFiltrados.push([`${cartao.partida} - ${cartao.destino}`, parseFloat(cartao.credito)]);
                    setCartoesFiltrados(cloneCartoesFiltrados);
                })
            }
        }
        fetchFiltro();
    }, [cartoes]);

    const data2 = [
        ["Year", "Sales", "Expenses"],
        ["2004", 1000, 400],
        ["2005", 1170, 460],
        ["2006", 660, 1120],
        ["2007", 1030, 540],
    ];


    const options = {
        title: "Gastos com viagens por mês",
        curveType: "function",
        legend: { position: "top" },
        colors: ['#FF2E93', '#232BCD']
    };

    const optionsRecarga = {
        title: "Gastos com recargas por mês",
        curveType: "function",
        legend: { position: "top" },
        colors: ['#0d104f']
    }

    const optionsCartao = {
        title: "Cartões com mais créditos",
        curveType: "function",
        legend: { position: "top" },
        colors: ['#515492', '#075be2']
    }

    return (
        <LayoutAdmin>
            <div className="grid grid-cols-2 gap-5 -mt-20 justify-between">
                <div className=" p-10  rounded-md bg-white shadow-lg">
                    <h1 className="mb-10 uppercase text-slate-500">Viagens</h1>
                    {viagens.length ?
                        <Chart
                            chartType="Bar"
                            width="100%"
                            height="400px"
                            data={viagensFiltradas}
                            options={options}
                        />
                        :
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            <strong className="font-bold">Não ha dados para mostrar!</strong>
                            <span className="block sm:inline"></span>
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                            </span>
                        </div>
                    }
                </div>
                <div className="p-10 rounded-md bg-white shadow-lg">
                    <h1 className="mb-10 uppercase text-slate-500">Recargas</h1>
                    {recargas.length ?
                        <Chart
                            chartType="Bar"
                            width="100%"
                            height="400px"
                            data={recargasFiltradas}
                            options={optionsRecarga}
                        />
                        :
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            <strong className="font-bold">Não ha dados para mostrar!</strong>
                            <span className="block sm:inline"></span>
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                            </span>
                        </div>
                    }
                </div>
                <div className="col-span-2 p-10 rounded-md bg-white shadow-lg">
                    <h1 className="mb-10 uppercase text-slate-500">Cartões</h1>
                    {cartoes.length ?
                        <Chart
                            chartType="PieChart"
                            width="100%"
                            height="400px"
                            data={cartoesFiltrados}
                            options={optionsCartao}
                        />
                        :
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            <strong className="font-bold">Não ha dados para mostrar!</strong>
                            <span className="block sm:inline"></span>
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                            </span>
                        </div>
                    }
                </div>
            </div>
        </LayoutAdmin>
    )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<any>> {
    const response = await viagemService.getAllViagem();
    const responseRecarga = await recargaService.getAllRecargas();
    const responseCartao = await cartaoService.getAllCartoes();

    return {
        props: {
            data: !response.error && response.data ? response.data : [],
            dataRecarga: !responseRecarga.error && responseRecarga.data ? responseRecarga.data : [],
            dataCartao: !responseCartao.error && responseCartao.data ? responseCartao.data : []
        }
    }
}