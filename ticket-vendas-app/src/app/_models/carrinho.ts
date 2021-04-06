import { IngressoModel } from './IngressoModel';

export class Carrinho {
    timestamp: number; // Usar esse campo para verificar se o carrinho é valido
    idEvento: string;
    ingressos: Array<IngressoModel>;
}
