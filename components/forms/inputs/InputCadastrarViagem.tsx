import InputMask from "react-input-mask";

import { InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<any> & {
    mask?: string,
    label: string,
    requiredInput?: boolean
}

export default function InputCadastrarViagem({ mask, label, requiredInput = true, ...rest }: Props) {
    return (
        <div>
            <label className="text-slate-700 font-bold uppercase text-xs">{label} {requiredInput ? <strong className="text-red-600">*</strong> : ''}</label><br />
            <InputMask mask={mask ? mask : ''} className="w-full bg-white rounded-md mt-1 p-3 outline-none text-slate-600 border-2 border-transparent shadow-md focus:ring focus:border-blue-500 transition-all" {...rest} required={requiredInput} />
        </div>
    )
}