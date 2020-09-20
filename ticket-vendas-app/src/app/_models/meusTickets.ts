export interface MeusTikets{
         descricaoEvento: string; 
         valor : string;
         lote : string;
         qrcode : string;
         setor : string;
         dataCriacao : string;
         idUser: string;
         descricaoDiaSemana: string;
         descricaoMes: string;
         diaNoMes: string;
         ano: string;
         dataEvento: string;
         dataValidacao: string;
         horaValidacao: string;
}

export interface MeusTiketsListResponse {
    list: Array<MeusTikets>;
    pages: number;
    current: number;
    perPage: number;
    total: number;
}

export interface MeusTiketsResponse extends MeusTikets {
    __v: number;
    descricaoEvento: string; 
    valor : string;
    lote : string;
    qrcode : string;
    setor : string;
    dataCriacao : string;
    idUser: string;
    descricaoDiaSemana: string;
    descricaoMes: string;
    diaNoMes: string;
    ano: string;
    dataEvento: string;
    dataValidacao: string;
    horaValidacao: string;
}
