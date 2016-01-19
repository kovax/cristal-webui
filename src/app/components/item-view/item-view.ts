import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {ItemCollection} from "../item-collection/item-collection";
import {ItemData} from "../item-data/item-data";
import {ItemSummary} from "../item-summary/item-summary";


@Component({
  selector: 'item-view',
  templateUrl: 'app/components/item-view/item-view.html',
  styleUrls: ['app/components/item-view/item-view.css'],
  providers: [],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})

@RouteConfig([
  { aux:'/:uuid',                   name: 'ItemSummary',    component: ItemSummary },
  { path:'/:uuid/data/:schema',     name: 'ItemData',       component: ItemData },
  { path:'/:uuid/collection/:name', name: 'ItemCollection', component: ItemCollection },
])

export class ItemView {
  constructor(private router: Router) {}
}
