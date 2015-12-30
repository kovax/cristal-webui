import {Injectable} from 'angular2/core';
import { Http, Response, Headers } from 'angular2/http';
import 'rxjs/add/operator/map';

export class LookupData {
    name: string;
    isItem: boolean = false;
    path: string;
    url: string;
    uuid: string;
}

@Injectable()
export class LookupService {
    root : string = 'http://localhost:8081/domain/';
    error: any;
    data: LookupData;

    constructor(private http: Http) {}

    getChildren(path: string) {
        return this.http.get(this.root + path)
            .map((res: Response) => {
                var json : any = res.json();
                let result : Array<LookupData> = [];

                for (var key in json) {
                    var data : LookupData = new LookupData();
                    data.name = key;

                    if(path.length == 0) data.path = key;
                    else data.path = path + "/" + key;

                    data.url = json[key];
                    var i = data.url.indexOf('item');
                    if (i != -1) {
                        data.isItem = true;
                        data.uuid = data.url.substr(i+5);
                    }
                    result.push(data)
                }
                return result;
            });
    }
}
