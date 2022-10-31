import { SelectHTMLAttributes } from "react"

type Props = SelectHTMLAttributes<any> & {
    label: string
    options: any[]
}

export default function SelectCadastroViagem({ label, options, ...rest }: Props) {
    return (
        <div>
            <label className="text-slate-700 font-bold uppercase text-xs">{label}</label><br />
            <select className="w-full rounded-md mt-1 p-3 outline-none bg-white text-slate-600 border-2 border-transparent shadow-md focus:ring focus:border-blue-500 transition-all" {...rest}>
                <option selected hidden value={""}>Escolha...</option>
                {options.map((op, index) => <option value={op.id} key={index}>{op.nome}</option>)}
            </select>
        </div>
    )
}