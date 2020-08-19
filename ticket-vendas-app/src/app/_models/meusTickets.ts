export interface MeusTikets{
         diaEvento : string;
         valor : string;
         lote : string;
         qrcode : string;
         utilizado : string;
         setor : string;
         dataCriacao : string;
         diaSemana : string;
         diaMes : string;
         descricaoMes : string;
}



export interface  MeusTiketsResponse extends MeusTikets {
    __v: number;
    diaEvento : string;
    valor : string;
    lote : string;
    qrcode : string;
    utilizado : string;
    setor : string;
    dataCriacao : string;
    diaSemana : string;
    diaMes : string;
    descricaoMes : string;
    id: string;
}
