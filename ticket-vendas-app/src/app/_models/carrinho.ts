export interface Carrinho{
    descricao: string;
    qtd: number;
    valor: string;
    setor: string;    
    lote: String;
    diaSemana: String;
    nomeEvento: String;
    data: String;
    id:string;
    informacoes: Array<QrCodes>
}

export interface QrCodes {
    descricaoMes: string;
}
