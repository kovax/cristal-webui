import {Component} from 'angular2/core';


@Component({
  selector: 'item-search',
  templateUrl: 'app/components/item-search/item-search.html',
  styleUrls: ['app/components/item-search/item-search.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class ItemSearch {

  searchTypes = ['Name','Type','Custom'];
  selectedSearchType = 'Name';

  constructor() {}

  setSearchType(type: string) {
    this.selectedSearchType = type;
  }

}
