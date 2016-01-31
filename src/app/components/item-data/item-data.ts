import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import {ItemService} from "../../services/item/item";
import {Logger} from "../../services/logger/logger";


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
  selectedViewName: string = 'last';

  viewNames: Array<string>;

  outcomeText: string;

  error: any;

  constructor(private router:      Router,
              private routeParams: RouteParams,
              private item:        ItemService,
              private logger:      Logger) {}

  ngOnInit() {
    this.uuid   = this.routeParams.get('uuid');
    this.schema = this.routeParams.get('schema');

    this.item.getSchemaViews(this.uuid, this.schema).subscribe(
        resp => this.viewNames = resp,
        err => this.error = err
    );

    this.getData();
  }

  setViewName(v: string) {
    this.selectedViewName = v;
    this.getData();
  }

  getData() {
    this.item.getSchemaViewData(this.uuid, this.schema, this.selectedViewName).subscribe(
        resp => this.outcomeText = resp.text(),
        err => this.error = err
    );
  }

}
