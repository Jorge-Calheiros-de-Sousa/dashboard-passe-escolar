export function converterFloatParaMoeda(valor: number) {
    return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}
export function converterMoedaParaFloat(valor: any) {
    if (valor === "") {
        valor = 0;
    } else {
        valor = valor.replace(".", "");
        valor = valor.replace(",", ".");
        valor = parseFloat(valor);
    }
    return valor;
}