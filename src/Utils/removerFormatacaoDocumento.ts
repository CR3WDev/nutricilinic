export function removerFormatacaoDocumento(cpf: String) {
    return cpf.replace(/[^0-9]/g, "");
}