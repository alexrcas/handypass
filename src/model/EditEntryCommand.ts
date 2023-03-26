export default class EditEntryCommand {

    public name: string;
    public username: string;
    public password: string;
    public observaciones: string;
    public visible: boolean;
    public uuid: number;

    constructor(name: string, username: string, password: string,
        observaciones: string, visible: boolean, uuid: number) {
            this.name = name;
            this.username = username;
            this.password = password;
            this.observaciones = observaciones;
            this.visible = visible;
            this.uuid = uuid;
    }


    toggleVisible = () => {
        this.visible = !this.visible;
    }

}
