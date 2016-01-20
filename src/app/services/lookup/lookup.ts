import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';

import {Logger} from "../logger/logger";
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

export class LookupData {
    name: string;
    isItem: boolean = false;
    path: string;
    url: string;
    uuid: string;

    constructor(p:string) {
        this.path = p;
    }
}

@Injectable()
export class LookupService {
    root : string = 'http://localhost:8081/';
    domainRoot: string = 'domain';

    constructor(private http: Http, private logger: Logger) {}

    getDomainChildren(path: string) {
        let json = sessionStorage.getItem(this.domainRoot + path);

        if(json != null) {
            this.logger.debug("LookupService.getDomainChildren() - path '"+this.domainRoot+path+"' was found in sessionStorage");
            //Observable.from(JSON.parse(json));
        }
        return this.http.get(this.root + this.domainRoot + path)
            .map((resp: Response) => {
                var json : any = resp.json();
                let result : Array<LookupData> = [];

                for (var key in json) {
                    var data : LookupData = new LookupData('');
                    data.name = key;

                    if(path.length == 0) data.path = "/" + key;
                    else                 data.path = path + "/" + key;

                    data.url = json[key];
                    var i = data.url.indexOf('item');
                    if (i != -1) {
                        data.isItem = true;
                        data.uuid = data.url.substr(i+5);
                    }

                    this.logger.debug('LookupService.getDomainChildren() - '+JSON.stringify(data));

                    result.push(data)
                }

                sessionStorage.setItem(this.domainRoot + path, JSON.stringify(result));

                return result;
            },
            err  => err
            );
    }

    getRoleChildren(path: string) {
        return this.http.get(this.root + path)
            .map((resp: Response) => {
                var json : any = resp.json();
                let result : Array<LookupData> = [];

                for (var key in json) {
                    var data : LookupData = new LookupData('');

                    data.name = key;
                    data.path = path + "/" + key;

                    result.push(data)
                }
                return result;
            },
            err  => err
            );
    }
}
