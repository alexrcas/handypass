export default class EntryType {

    private name: string;
    private username: string;
    private password: string;
    private details: string;
    private visible: boolean;
    private uuid: number;

    constructor(name: string, username: string, password: string,
        details: string, visible: boolean, uuid?: number) {
            this.name = name;
            this.username = username;
            this.password = password;
            this.details = details;
            this.visible = visible;
            this.uuid = uuid || Date.now();
    }

    getName = (): string => {
        return this.name;
    }

    setName = (name: string) => {
        this.name = name;
    }

    getUsername = (): string => {
        return this.username;
    }

    setUsername = (username: string) => {
        this.username = username;
    }

    getPassword = (): string => {
        return this.password;
    }

    setPassword = (password: string) => {
        this.password = password;
    }

    getDetails = (): string => {
        return this.details;
    }

    setDetails = (details: string) => {
        this.details = details;
    }

    getVisible = (): boolean => {
        return this.visible;
    }

    setVisible = (visible: boolean) => {
        this.visible = visible;
    }

    getUuid = (): number => {
        return this.uuid;
    }

    toggleVisible = () => {
        this.visible = !this.visible;
    }

}
