type Props = {
    title: string
}

export default function Header({ title }: Props) {
    return (
        <header className="text-white flex">
            <h1 className="uppercase font-bold" style={{ fontSize: 15 }}>{title}</h1>
        </header>
    )
}