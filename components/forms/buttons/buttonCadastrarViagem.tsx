import { ButtonHTMLAttributes } from "react"

type Props = ButtonHTMLAttributes<any> & {
    children: any
}

export default function ButtonCadastrarViagem({ children, ...rest }: Props) {
    return (
        <button className="w-fit py-2 px-4 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-800 transition-all" {...rest}>
            {children}
        </button>
    )
}