import {Injectable} from 'angular2/core';
import { Http, Response } from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemService {
    root : string = 'http://localhost:8081/item/';

    constructor(private http: Http) { }

    getSummary(uuid: string) : any {
        return this.http.get(this.root + uuid)
            .map((res: Response) => res.json());
    }

}
