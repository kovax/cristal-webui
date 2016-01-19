import {Component, OnInit} from 'angular2/core';
import {Input} from "angular2/core";
import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";
import {ItemService} from "../../services/item/item";
import {Logger} from "../../services/logger/logger";
import {ROUTER_DIRECTIVES} from "angular2/router";


@Component({
  selector: 'item-data',
  templateUrl: 'app/components/item-data/item-data.html',
  styleUrls: ['app/components/item-data/item-data.css'],
  providers: [ItemService],
  directives: [ROUTER_DIRECTIVES],
  properties: [],
  pipes: []
})

export class ItemData implements OnInit{

  uuid: string;
  schema: string;
  selectedVersion: string = 'last';

  versions: Array<string>;

  xml: string;

  error: any;

  constructor(private router:      Router,
              private routeParams: RouteParams,
              private item:        ItemService,
              private logger:      Logger) {}

  ngOnInit() {
    this.uuid   = this.routeParams.get('uuid');
    this.schema = this.routeParams.get('schema');

    this.item.getDataVersions(this.uuid, this.schema).subscribe(
        resp => this.versions = resp,
        err => this.error = err
    );

    this.getData();
  }

  setVersion(v: string) {
    this.selectedVersion = v;
    this.getData();
  }

  getData() {
    this.item.getData(this.uuid, this.schema, this.selectedVersion).subscribe(
        resp => this.xml = resp.text(),
        err => this.error = err
    );
  }

}
