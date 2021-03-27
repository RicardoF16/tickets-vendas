export class EventoResponse {
    id: string;
    titulo: string;
    descricao: string;
    dataInicio: string;
    dataFim: string;
    imagemUrl: string;
    tipo: number;
    censura: string;
    local: string;
    nomeLocal: string;
    pontosVenda: any;
    diasEvento?: Array<DiasEventoResponse>;
}

export class DiasEventoResponse {
    id: string;
    dataInicio: string;
    dataFim: string;
    horaAbertura: string;
    horaShow: string;
    lotes: Array<LoteResponse>;
    idadeMinima: Number;
    censura: string;
    atracoes: Array<AtracaoResponse>;
    divEnabled: Boolean = false;
}


export class AtracaoResponse {
    link: string;
    nome: string;
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