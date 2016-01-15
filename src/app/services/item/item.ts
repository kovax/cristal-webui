import {Injectable} from 'angular2/core';
import {Http} from "angular2/http";
import {Logger} from "../logger/logger";


@Injectable()
export class ItemService {

  constructor(private http: Http, private logger: Logger) {}

  getItemSummary(uuid: string) {

  }
}
