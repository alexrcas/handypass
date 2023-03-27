export interface Entry {
    uuid: number;
    name: string;
    username: string;
    password: string;
    details: string;
}

export interface Properties {
    key: string;
    entries: Entry[];
}