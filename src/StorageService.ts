import fs from 'fs';
import { Properties } from './model/Properties';

export default class StorageService {

    private static FILENAME: string = 'storage.data';

    static loadProperties = (): Properties => {
        const f = fs.readFileSync(this.FILENAME, 'utf-8');
        const data: Properties = JSON.parse(f);
        return data;
    }

    static saveProperties = (properties: Properties) => {
        const serialized = JSON.stringify(properties);
        fs.writeFileSync(this.FILENAME, serialized);
    }

    static createPropertiesIfNotExist = () => {
        console.log('create file!')
        if (fs.existsSync(this.FILENAME)) {
            return;
        }

        const properties: Properties = {
            key: '',
            entries: []
        }

        fs.writeFileSync(this.FILENAME, JSON.stringify(properties));
    }

}