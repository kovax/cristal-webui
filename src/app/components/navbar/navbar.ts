import {Component} from 'angular2/core';
import {ItemSearch} from "../item-search/item-search";
import {ROUTER_DIRECTIVES} from "angular2/router";

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
