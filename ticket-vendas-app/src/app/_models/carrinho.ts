import { IngressoModel } from './IngressoModel';

export class Carrinho {
    timestamp: number; // Usar esse campo para verificar se o carrinho é valido
    idEvento: string;
    ingressos: Array<IngressoModel>;

    public valorTotal(): number {
        if (this.ingressos && this.ingressos.length > 0) {
            let total = 0;
            this.ingressos.forEach(i => {
                if (i.qtdeSelecionada > 0 && i.valor) {
                    total += Number(i.valor) * Number(i.qtdeSelecionada);
                }
            });
            return total;
        } else {
            return 0;
        }
    };
}
