export default class EditEntryCommand {

    public name: string;
    public username: string;
    public password: string;
    public observaciones: string;
    public uuid: number;

    constructor(name: string, username: string, password: string,
        observaciones: string, uuid: number) {
            this.name = name;
            this.username = username;
            this.password = password;
            this.observaciones = observaciones
            this.uuid = uuid;
        }

} 
