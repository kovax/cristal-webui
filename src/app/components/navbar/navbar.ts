import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";

import {ItemSearch} from "../item-search/item-search";

@Component({
  selector: 'navbar',
  templateUrl: 'app/components/navbar/navbar.html',
  styleUrls: ['app/components/navbar/navbar.css'],
  providers: [],
  directives: [ItemSearch, ROUTER_DIRECTIVES],
  pipes: [],
  properties: ['projectName']
})

export class Navbar {

  projectName: string;

  constructor() {}
}
