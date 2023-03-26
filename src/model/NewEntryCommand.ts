export default class newEntryCommand {

    public name: string;
    public username: string;
    public password: string;
    public observaciones: string;
    public visible: boolean;

    constructor(name: string, username: string, password: string,
        observaciones: string, visible: boolean) {
            this.name = name;
            this.username = username;
            this.password = password;
            this.observaciones = observaciones;
            this.visible = visible;
    }


    toggleVisible = () => {
        this.visible = !this.visible;
    }

}
