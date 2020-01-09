export interface IUSer {
    username: string;
    displayName: string;
    token: string,
    image?: string,
}

export interface IUSerFormValues {
    email: string;
    password: string;
    displayName?: string;
    userName: string;
}