import fs from 'fs';
import { Properties } from './model/Properties';

export default class StorageService {

    private static FILENAME: string = 'storage.json';

    static loadProperties = (): Properties => {
        const f = fs.readFileSync(this.FILENAME, 'utf-8');
        const data: Properties = JSON.parse(f);
        return data;
    }

    static saveProperties = (properties: Properties) => {
        const serialized = JSON.stringify(properties);
        fs.writeFileSync(this.FILENAME, serialized);
    }

}