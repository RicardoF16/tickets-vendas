export class IngressoModel{
    id: number;
    idDataEvento: string;
    idLote: string;
    dataEvento: string;
    cortesia: Boolean;
    descricao: string;
    qtdeTicketsVendidos: number;
    qtdeTotalTickets: number;
    setor: number;
    valor: number;
    ativo: Boolean;
    
    //Campo para seleção de itens no app
    qtdeSelecionada: number = 0;
}
