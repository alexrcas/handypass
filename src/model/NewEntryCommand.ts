export default class newEntryCommand {

    public name: string;
    public username: string;
    public password: string;
    public observaciones: string;

    constructor(name: string, username: string, password: string,
        observaciones: string) {
            this.name = name;
            this.username = username;
            this.password = password;
            this.observaciones = observaciones;
    }

}
