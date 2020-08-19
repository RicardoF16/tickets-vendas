import { MeusTikets } from './meusTickets';
export interface User {
    id?: string;
    nome: string;
    email: string;
    senha?: string;
    imagemURL?: string;
    meusTickets?: Array <MeusTikets>;
}


export interface UserTemp extends User {
    confirmPassword: string;
    confirmEmail: string;
    terms: boolean;
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
