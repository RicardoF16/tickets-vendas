export class EventoResponse {
    id: string;
    titulo: string;
    descricao: string;
    dataInicio: string;
    dataFim: string;
    imagemURL: string;
    tipo: number;
    diasEvento?: Array<DiasEventoResponse>;
}

export class DiasEventoResponse {
    id: string;
    dataInicio: string;
    dataFim: string;
    lotes: Array<LoteResponse>;
}


export class LoteResponse {
    id: string;
    descricao: string;
    cortesia: boolean;
    qtdeTicketsVendidos: number;
    qtdeTotalTickets: number;
    setor: number;
    valor: number;
}