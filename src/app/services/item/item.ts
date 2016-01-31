import {Injectable} from 'angular2/core';
import {Http, Response, RequestOptions, RequestMethod, Headers, URLSearchParams} from "angular2/http";
import {Logger} from "../logger/logger";
import {Event, Outcome, Activity, Transition} from "../../components/item-event/item-event";


export class Property {
    constructor(public name:string, public value:any) {}
}

export class ItemSummaryModel {
    name:string;
    properties:Array<Property> = new Array<Property>();
    data:Array<string>         = new Array<string>();
    collections:Array<string>  = new Array<string>();

    constructor() {}
}


@Injectable()
export class ItemService {

    root:string = 'http://localhost:8081/item/';
    options: RequestOptions;

    constructor(private http:Http, private logger:Logger) {
        this.options = new RequestOptions({
            headers: new Headers({'Accept': 'application/json'})
        });
    }

    getSummary(uuid:string) {
        return this.http.get(this.root + uuid, this.options)
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

    getSchemaViews(uuid:string, schema:string) {
        return this.http.get(this.root + uuid + "/data/" + schema, this.options)
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

    getSchemaViewData(uuid:string, schema:string, view:string) {
        return this.http.get(this.root + uuid + "/data/" + schema + "/" + view, this.options);
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

    getEvent(uuid:string, id:number) {
        return this.http.get(this.root + uuid + "/history/"+id, this.options)
            .map( res => res.json(), err  => err);
    }

    getEventData(uuid:string, id:number) {
        return this.http.get(this.root + uuid + "/history/"+id+"/data", this.options);
    }

    getJobs(uuid:string, agent:string) {
        let options = new RequestOptions({
            method: RequestMethod.Options,
            headers: new Headers({'Accept': 'application/json'}),
            search: new URLSearchParams()
        });

        options.search.append('agent', agent);

        return this.http.get(this.root + uuid, options)
            .map( res => res.json(), err  => err);
    }
}
