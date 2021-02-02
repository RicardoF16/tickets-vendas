import { MeusTikets } from './meusTickets';
export interface User {
    uid?: string;
    key?: string;
    nome: string;
    dataNascimento?: string;
    email: string;
    senha?: string;
    cpf?: string;
    genero?: string;
    imagemURL?: string;
    meusTickets?: Array <MeusTikets>;
}

export interface Planos {
    dataCompra: string;
    id: string;
    transacao: string;
    veiculo: string;
    vencimento: string;
}

export interface UserResponse extends User {
    __v: number;
    nome: string;
    email: string;
    premium: boolean;
    papel: number;
    id: string;
    index: number;
    idPushNotification?: Array<string>;
}

export interface UserGoogle {
    accessToken: string;
    displayName: string;
    email: string;
    expires: number;
    expires_in: number;
    familyName: string;
    givenName: string;
    idToken: string;
    imageUrl: string;
    serverAuthCode: string;
    userId: string;

}
