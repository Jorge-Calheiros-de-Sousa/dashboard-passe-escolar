import Link from "next/link";
import { useRouter } from "next/router";

export default function SideBar() {
    const router = useRouter();
    return (
        <>
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
                <div>
                    <h1 className="uppercase font-bold text-slate-700 text-xl mb-3">Passe escolar</h1>
                    <ul className="ml-2 border-t-2 py-5">
                        <h1 className="uppercase font-bold text-slate-500 text-xs mb-5">Admin layout pages</h1>
                        <Link href={'/admin/dashboard'}>
                            <li className="font-bold text-xs text-slate-700 w-fit px-2 py-5 uppercase hover:text-slate-400 transition-all cursor-pointer"
                                style={{
                                    color: router.pathname.indexOf('/admin/dashboard') != -1 ? 'cornflowerblue' : ''
                                }}
                            >Dashboard</li>
                        </Link>
                        <Link href={'/admin/cartao'}>
                            <li className="font-bold text-xs text-slate-700 w-fit px-2 py-5 uppercase hover:text-slate-400 transition-all cursor-pointer"
                                style={{
                                    color: router.pathname == '/admin/cartao' ? 'cornflowerblue' : ''
                                }}
                            >Listar Cartões</li>
                        </Link>
                        <Link href={'/admin/cartao/cadastrar'}>
                            <li className="font-bold text-xs text-slate-700 w-fit px-2 py-5 uppercase hover:text-slate-400 transition-all cursor-pointer"
                                style={{
                                    color: router.pathname == '/admin/cartao/cadastrar' ? 'cornflowerblue' : ''
                                }}
                            >Cadastrar cartão</li>
                        </Link>
                        <Link href={'/admin/onibus'}>
                            <li className="font-bold text-xs text-slate-700 w-fit px-2 py-5 uppercase hover:text-slate-400 transition-all cursor-pointer"
                                style={{
                                    color: router.pathname == '/admin/onibus' ? 'cornflowerblue' : ''
                                }}
                            >Listar onibûs</li>
                        </Link>
                        <Link href={'/admin/viagens'}>
                            <li className="font-bold text-xs text-slate-700 w-fit px-2 py-5 uppercase hover:text-slate-400 transition-all cursor-pointer"
                                style={{
                                    color: router.pathname == '/admin/viagens' ? 'cornflowerblue' : ''
                                }}
                            >Listar viagens</li>
                        </Link>
                        <Link href={'/admin/recargas'}>
                            <li className="font-bold text-xs text-slate-700 w-fit px-2 py-5 uppercase hover:text-slate-400 transition-all cursor-pointer"
                                style={{
                                    color: router.pathname == '/admin/recargas' ? 'cornflowerblue' : ''
                                }}
                            >Listar recargas</li>
                        </Link>
                    </ul>
                </div>
            </nav>
        </>
    )
}