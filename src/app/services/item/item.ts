import {Injectable} from 'angular2/core';
import {Http, Response} from "angular2/http";
import {Logger} from "../logger/logger";
import {Event, Outcome, Activity, Transition} from "../../components/item-history/item-history";


export class Property {
    constructor(public name:string, public value:any) {}
}

export class ItemSummaryModel {
    name:string;
    properties:Array<Property> = new Array<Property>();
    data:Array<string> = Array<string>();
    collections:Array<string> = Array<string>();

    constructor() {}
}


@Injectable()
export class ItemService {

    root:string = 'http://localhost:8081/item/';

    constructor(private http:Http, private logger:Logger) {}

    getSummary(uuid:string) {
        this.http
        return this.http.get(this.root + uuid)
            .map(
                (res:Response) => {
                    var json = res.json();
                    let result:ItemSummaryModel = new ItemSummaryModel();

                    for (let key in json) {
                        if (key == 'name') {
                            result.name = json[key];
                        }
                        else if (key == 'properties') {
                            for (let name in json[key]) {
                                result.properties.push(new Property(name, json[key][name]));
                            }
                        }
                        else if (key == 'data') {
                            for (let name in json[key]) {
                                result.data.push(name);
                            }
                        }
                        else if (key == 'collections') {
                            for (let name in json[key]) {
                                result.collections.push(name);
                            }
                        }
                    }
                    this.logger.debug('ItenService.getSummary() - ' + JSON.stringify(result));
                    return result;
                },
                err  => err
            );
    }

    getDataVersions(uuid:string, schema:string) {
        return this.http.get(this.root + uuid + "/data/" + schema)
            .map(
                (res:Response) => {
                    let json = res.json();
                    let result:Array<string> = new Array<string>();

                    for (let key in json) result.push(key);

                    return result;
                },
                err  => err
            );
    }

    getData(uuid:string, schema:string, version:string) {
        return this.http.get(this.root + uuid + "/data/" + schema + "/" + version);
    }

    getHistory(uuid:string) {
        return this.http.get(this.root + uuid + "/history")
            .map(
                (res:Response) => {
                    let json = res.json();
                    let result:Array<Event> = new Array<Event>();

                    for (let key in json) result.push(json[key]);

                    return result;
                },
                err  => err
            );
    }
}
