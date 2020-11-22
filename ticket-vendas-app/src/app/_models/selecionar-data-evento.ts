import { IngressoModel } from './IngressoModel';
export interface Informacoes {
    descricaoMes: string;
    dataCriacao: string;
    diaEvento: string;
    diaMes: string;
    diaSemana: string;
    id: string;
    setor: Array <IngressoModel>;
    valorFinal: string;
    valorInicial: string;
    index: number;
    __v: number;
}