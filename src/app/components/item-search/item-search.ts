import {Component} from 'angular2/core';
import {LookupData} from "../../services/lookup/lookup";
import {Router} from "angular2/router";
import {Logger} from "../../services/logger/logger";


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

  constructor(private router: Router, private logger: Logger) {}

  setSearchType(type: string) {
    this.selectedSearchType = type;
  }

  search(query: string) {
    if(query != null && query != '') {
      switch(this.selectedSearchType) {
        case "Name":
        case "Custom":
          query = "?search=" + query;
          break;

        default:
          query = "?search=" + this.selectedSearchType + ":" + query;
          break;
      }
      this.logger.debug("ItemSearch.search() - query:'"+query+"'");

      this.router.navigate( ['Domain', { path: query }] );
    }
  }
}
