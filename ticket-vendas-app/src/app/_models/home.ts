import { Informacoes } from './selecionar-data-evento';
export interface EventosResponse  {
    list: EventosResponse;
    __v: number;
    descricao: string;
    dataFim: string;
    dataInicio: string;
    imagemURL?: string;
    informacoes: Array<Informacoes>
    id: string;
    index: number;
}
