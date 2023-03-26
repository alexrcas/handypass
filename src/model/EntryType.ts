export default class EntryType {

    private name: string;
    private username: string;
    private password: string;
    private observaciones: string;
    private visible: boolean;
    private uuid: number;

    constructor(name: string, username: string, password: string,
        observaciones: string, visible: boolean) {
            this.name = name;
            this.username = username;
            this.password = password;
            this.observaciones = observaciones;
            this.visible = visible;
            this.uuid = Date.now();
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

    getObservaciones = (): string => {
        return this.observaciones;
    }

    setObservaciones = (observaciones: string) => {
        this.observaciones = observaciones;
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
