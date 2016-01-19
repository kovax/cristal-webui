import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from "angular2/router";
import {Logger} from "../../services/logger/logger";
import {ItemService, ItemSummaryModel, Property} from "../../services/item/item";
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
  selector: 'item-summary',
  templateUrl: 'app/components/item-summary/item-summary.html',
  styleUrls: ['app/components/item-summary/item-summary.css'],
  providers: [ItemService],
  directives: [ROUTER_DIRECTIVES],
  pipes: [],
  properties: []
})

export class ItemSummary implements OnInit {

  name: string;
  uuid: string;

  type: string;
  complexity: string;

  properties: Array<Property> = new Array<Property>();

  data: Array<string> = Array<string>();
  collections: Array<string> = Array<string>();

  error: any;

  constructor(private router: Router,
              private routeParams: RouteParams,
              private item: ItemService,
              private logger: Logger) {}

  ngOnInit () {
    this.uuid = this.routeParams.get('uuid');

    this.logger.debug("ItemSummary.ngOnInit() - uuid:'"+this.uuid+"'");

    this.item.getSummary(this.uuid).subscribe(
      (resp: ItemSummaryModel) => {
        this.name = resp.name;
        this.data = resp.data;
        this.collections = resp.collections;

        for (let prop of resp.properties) {
          switch(prop.name) {
            case 'Type':
              this.type = prop.value;
              break;
            case 'Complexity':
              this.complexity = prop.value;
              break;
            default:
              this.properties.push(prop);
              break;
          }
        }
      },
      error => this.error = error
    );
  }
}
